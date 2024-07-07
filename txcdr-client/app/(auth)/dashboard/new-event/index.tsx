import { Alert, Platform, Pressable, StyleSheet, View } from "react-native";
import { DText } from "../../../../components/styled-rn/DText";
import { MaterialIcons } from "@expo/vector-icons";
import { msc } from "../../../../utils/size-matters-aliases";
import { Zinc } from "../../../../utils/styles/colors";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DTextInput } from "../../../../components/styled-rn/DTextInput";
import { useCallback, useState } from "react";
import { StyledButton } from "../../../../components/buttons/StyledButton";
import CustomDateTimePicker from "react-native-ui-datepicker";
import { supabase } from "../../../../utils/supabase";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { parseExcel } from "../../../../utils/address-parser";
import * as XLSX from "xlsx";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Page() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");
  const [addressFile, setAddressFile] =
    useState<DocumentPicker.DocumentPickerAsset>();
  const [addressFileError, setAddressFileError] = useState<string>("");
  const [formFile, setFormFile] =
    useState<DocumentPicker.DocumentPickerAsset>();
  const [formFileError, setFormFileError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const onSubmit = async () => {
    if (!name || !desc) {
      Alert.alert(
        "Make sure you provide both the name and description for the event!",
      );
      return;
    }

    const { data, error } = await supabase
      .from("Event")
      .insert({
        title: name,
        description: desc,
        startDate: date.toISOString(),
        updatedAt: date.toISOString(),
        createdAt: date.toISOString(),
      })
      .select()
      .maybeSingle();

    if (error) {
      Alert.alert(
        "An error occurred while attempting to create this event.\nError: " +
          error.message,
      );
      return;
    }

    if (!data) {
      Alert.alert("Unable to verify that the event was created.");
      return;
    }

    console.log("Created event, ID: " + data.id);
    router.back();
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

  const handleFormFileUpload = async () => {
    const { assets, canceled }: DocumentPicker.DocumentPickerResult =
      await DocumentPicker.getDocumentAsync();

    if (!canceled) {
      if (assets.length > 0) {
        const asset: DocumentPicker.DocumentPickerAsset = assets[0];

        if (
          asset.mimeType ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          setFormFile(asset);
          setFormFileError("");
        } else {
          setFormFileError("File must be of type .xlsx");
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (addressFile == undefined || formFile == undefined) {
      setSubmitError(
        "Missing at least one of 'Address List' form or 'Disaster Impact Questions' form.",
      );
      return;
    }
    const data = await FileSystem.readAsStringAsync(addressFile.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const wb = XLSX.read(data, { type: "base64" });

    const ws = wb.Sheets[wb.SheetNames[0]];

    console.log(XLSX.utils.sheet_to_json(ws));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <DText style={{ fontWeight: "bold", fontSize: msc(24) }}>
          New Event
        </DText>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" size={msc(32, 0.25)} color={Zinc[900]} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Image
          source={require("../../../../assets/map.png")}
          style={styles.map}
        />
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>Event Name</DText>
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
            style={[styles.input, { height: msc(128), paddingVertical: 20 }]}
            onChangeText={setDesc}
            multiline={true}
            textAlignVertical="top" // Add this line to move the cursor away from the border
          />
        </View>
        <View style={styles.field}>
          <DText style={styles.fieldTitle}>
            Upload Forms --TODO: store this somewhere and process it--
          </DText>
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
          <DText style={styles.fieldTitle}>
            Disaster Impact Questions --TODO: store this somewhere--
          </DText>
          <Pressable style={styles.uploadButton} onPress={handleFormFileUpload}>
            <MaterialCommunityIcons
              name="file-upload-outline"
              color="#8C8C8C"
              size={28}
              style={{ marginRight: 16 }}
            />
            <DText style={{ fontSize: 14 }}>
              {formFile == undefined ? "Upload file" : formFile.name}
            </DText>
          </Pressable>
          {formFileError != "" && (
            <DText style={{ ...styles.footer, color: "red" }}>
              {formFileError}
            </DText>
          )}
        </View>
        <StyledButton
          onPress={() => {
            handleSubmit();
            onSubmit();
          }}
          style={{ marginVertical: msc(32) }}
        >
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
    marginTop: msc(16),
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    marginTop: msc(20),
    width: "85%",
    gap: msc(20),
  },
  field: {
    gap: 10,
  },
  fieldTitle: {
    fontWeight: "bold",
    fontSize: msc(16),
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Zinc[200],
    borderRadius: 30,
    height: msc(40),
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
