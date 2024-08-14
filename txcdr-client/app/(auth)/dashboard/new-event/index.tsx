import { Alert, Pressable, StyleSheet, View } from "react-native";
import { DText } from "../../../../components/styled-rn/DText";
import { MaterialIcons } from "@expo/vector-icons";
import { Zinc } from "../../../../utils/styles/colors";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DTextInput } from "../../../../components/styled-rn/DTextInput";
import { useState } from "react";
import { StyledButton } from "../../../../components/buttons/StyledButton";
import CustomDateTimePicker from "react-native-ui-datepicker";
import { supabase } from "../../../../utils/supabase";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { parseAddressSheet } from "../../../../utils/parser";
import { ms } from "react-native-size-matters";

export default function Page() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [addressFile, setAddressFile] =
    useState<DocumentPicker.DocumentPickerAsset>();
  const [addressFileError, setAddressFileError] = useState<string>("");
  const [formLink, setFormLink] = useState("");
  const [submitError, setSubmitError] = useState<string>("");

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

    if (addressFile == undefined) {
      Alert.alert("Missing the 'Address List' form.");
      return;
    }

    // Get current session
    const session = await supabase.auth.getSession();
    if (session.error || !session.data?.session) {
      Alert.alert("Error getting session: ", session?.error?.message);
      return;
    }

    // Validate address file
    let addressParseResp = await parseAddressSheet(addressFile.uri, -1);

    if (addressParseResp.error) {
      Alert.alert(
        "Error parsing address sheet: ",
        addressParseResp.error.message,
      );
      return;
    }

    // Add event to db
    const createResp = await supabase
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

    if (!createResp || createResp.error) {
      Alert.alert(
        "An error occurred while attempting to create this event.\nError: " +
          createResp.error.message,
      );
      return;
    }

    if (!createResp.data) {
      Alert.alert("Unable to verify that the event was created.");
      return;
    }

    console.log("Created event, ID: " + createResp.data.id);

    // Inject event ID into address data and mass upload
    addressParseResp.data.forEach((address) => {
      address.eventId = createResp!.data!.id; // Non-null is guaranteed by the above checks
    });

    const addressUploadResp = await supabase
      .from("EventAddress")
      .insert(addressParseResp.data);

    if (addressUploadResp.error) {
      Alert.alert(
        "Error uploading addresses: ",
        addressUploadResp.error.message,
      );
      return;
    }

    router.back();
    Alert.alert("Successfully created event!");
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
          New Event
        </DText>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" size={ms(32, 0.25)} color={Zinc[900]} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Image
          source={require("../../../../assets/map.png")}
          style={styles.map}
        />
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Event name</DText>
          <DTextInput style={styles.input} onChangeText={setName} />
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
