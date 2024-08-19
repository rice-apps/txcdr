import { Alert, Pressable, StyleSheet, View } from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { MaterialIcons } from "@expo/vector-icons";
import { Zinc } from "../../../utils/styles/colors";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DTextInput } from "../../../components/styled-rn/DTextInput";
import { useEffect, useState } from "react";
import { StyledButton } from "../../../components/buttons/StyledButton";
import CustomDateTimePicker from "react-native-ui-datepicker";
import { supabase } from "../../../utils/supabase";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { parseAddressSheet } from "../../../utils/parser";
import { ms } from "react-native-size-matters";

export default function Page({ eventId }: { eventId?: string }) {
  const isEdit = eventId != undefined;
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [addressFile, setAddressFile] =
    useState<DocumentPicker.DocumentPickerAsset>();
  const [addressFileError, setAddressFileError] = useState<string>("");
  const [formLink, setFormLink] = useState("");
  const [submitError, setSubmitError] = useState<string>("");

  // get event data if editing
  useEffect(() => {
    if (isEdit) {
      const func = async () => {
        const eventResp = await supabase
          .from("Event")
          .select("*")
          .eq("id", eventId)
          .single();

        if (eventResp.error) {
          Alert.alert("Error getting event data: ", eventResp.error.message);
          return;
        }

        if (!eventResp.data) {
          Alert.alert("Event not found.");
          return;
        }

        const event = eventResp.data;
        console.log(event);
        setName(event.title);
        setDesc(event.description);
        setDate(new Date(event.startDate));
        setFormLink(event.formLink);
      };
      console.log("testing");
      func();
    }
  }, []);
  const onSubmit = async () => {
    if (!name || !desc) {
      Alert.alert(
        "Make sure you provide both the name and description for the event!",
      );
      return;
    }

    if (!formLink) {
      Alert.alert("Make sure you provide a Google Form link for the event!");
      return;
    }

    if (addressFile == undefined && !isEdit) {
      Alert.alert("Missing the 'Address List' form.");
      return;
    }

    // Get current session
    const session = await supabase.auth.getSession();
    if (session.error || !session.data?.session) {
      Alert.alert("Error getting session: ", session?.error?.message);
      return;
    }

    let addressParseResp = null;
    if (!isEdit || addressFile) {
      // Validate address file
      addressParseResp = await parseAddressSheet(addressFile!.uri, -1);

      if (addressParseResp.error) {
        Alert.alert(
          "Error parsing address sheet: ",
          addressParseResp.error.message,
        );
        return;
      }
    }

    let resp;
    // Add event to db
    if (!isEdit) {
      resp = await supabase
        .from("Event")
        .insert({
          title: name,
          description: desc,
          startDate: date.toISOString(),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          creatorId: session.data.session?.user.id,
          formLink: formLink,
        })
        .select()
        .maybeSingle();
    } else {
      resp = await supabase
        .from("Event")
        .update({
          title: name,
          description: desc,
          startDate: date.toISOString(),
          updatedAt: new Date().toISOString(),
          formLink: formLink,
        })
        .eq("id", eventId)
        .select()
        .maybeSingle();
    }

    if (!resp || resp.error) {
      Alert.alert(
        "An error occurred while attempting to create/modify this event.\nError: " +
          resp.error.message,
      );
      return;
    }

    if (!resp.data) {
      Alert.alert("Unable to verify that the event was created/modified.");
      return;
    }

    console.log("Created event, ID: " + resp.data.id);

    if (addressParseResp) {
      const addressUploadResp = await supabase
        .from("Address")
        .upsert(addressParseResp.data, {
          onConflict: "blockId, number, street, type, city, state, zipCode",
        })
        .select("*");

      if (addressUploadResp.error) {
        Alert.alert(
          "Error uploading addresses: ",
          addressUploadResp.error.message,
        );
        return;
      }

      addressUploadResp.data;

      const eventAddresses = addressUploadResp.data!.map((a) => {
        return { addressId: a.id, eventId: createResp!.data!.id };
      });

      const eventAddressUploadResp = await supabase
        .from("EventAddress")
        .insert(eventAddresses);

      if (eventAddressUploadResp.error) {
        Alert.alert(
          "Error uploading event-address associations: ",
          eventAddressUploadResp.error.message,
        );
        return;
      }
    }

    router.back();
    Alert.alert("Successfully updated event!");
  };

  const handleAddressFileUpload = async () => {
    const { assets, canceled }: DocumentPicker.DocumentPickerResult =
      await DocumentPicker.getDocumentAsync();

    if (!canceled) {
      if (assets.length > 0) {
        const asset: DocumentPicker.DocumentPickerAsset = assets[0];

        if (
          asset.mimeType ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          console.log(asset);
          setAddressFile(asset);
          setAddressFileError("");
        } else {
          setAddressFileError("File must be of type .xlsx");
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.topBar}>
        <DText style={{ fontWeight: "bold", fontSize: ms(24) }}>
          {!isEdit ? "New Event" : "Edit Event"}
        </DText>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" size={ms(32, 0.25)} color={Zinc[900]} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Image source={require("../../../assets/map.png")} style={styles.map} />
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Event name</DText>
          <DTextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <DText style={{ fontStyle: "italic", color: Zinc[400] }}>
            30 characters max
          </DText>
        </View>
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Select start date</DText>
          <CustomDateTimePicker
            date={date}
            mode="single"
            onChange={(e) => {
              if (e.date) setDate(new Date(e.date.valueOf()));
            }}
          />
        </View>
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Create description</DText>
          <DTextInput
            style={[styles.input, { height: ms(128), paddingVertical: 20 }]}
            value={desc}
            onChangeText={setDesc}
            multiline={true}
            textAlignVertical="top" // Add this line to move the cursor away from the border
          />
        </View>
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Addresses Excel sheet</DText>
          <Pressable
            style={styles.uploadButton}
            onPress={handleAddressFileUpload}
          >
            <MaterialCommunityIcons
              name="file-upload-outline"
              color="#8C8C8C"
              size={28}
              style={{ marginRight: 16 }}
            />
            <DText style={{ fontSize: 14 }}>
              {" "}
              {addressFile == undefined ? "Upload file" : addressFile.name}{" "}
            </DText>
          </Pressable>
        </View>
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Questions Google Form Link</DText>
          <DTextInput
            style={styles.input}
            onChangeText={setFormLink}
            placeholder='e.g. "https://docs.google.com/forms/..."'
            value={formLink}
          />
          <DText style={{ fontStyle: "italic", color: Zinc[400] }}>
            Remember to make sure this is a shareable link!
          </DText>
        </View>
        <StyledButton onPress={onSubmit} style={{ marginVertical: ms(32) }}>
          <DText style={{ color: Zinc[100], fontWeight: "bold" }}>Submit</DText>
        </StyledButton>
        {submitError != "" && (
          <DText style={{ ...styles.footer, color: "red" }}>
            {submitError}
          </DText>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
  },
  topBar: {
    marginTop: ms(16),
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    marginTop: ms(20),
    width: "85%",
    gap: ms(20),
  },
  field: {
    gap: 10,
  },
  fieldTitle: {
    fontWeight: "bold",
    fontSize: ms(16),
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Zinc[200],
    borderRadius: 30,
    height: ms(40),
    paddingHorizontal: 20,
  },
  map: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 25,
    alignSelf: "center",
  },
  uploadButton: {
    height: 60,
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: "#8C8C8C",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  footer: {
    fontStyle: "italic",
    color: "#8C8C8C",
    marginTop: 8,
  },
});
