import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, Pressable } from 'react-native';
import { Image } from 'expo-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import parseExcel from '../../../utils/address-parser';
import * as XLSX from 'xlsx';

export default function Page() {
  const [eventName, setEventName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");

  const [addressFile, setAddressFile] = useState<DocumentPicker.DocumentPickerAsset>();
  const [addressFileError, setAddressFileError] = useState<string>("");

  const [formFile, setFormFile] = useState<DocumentPicker.DocumentPickerAsset>();
  const [formFileError, setFormFileError] = useState<string>("");

  const [submitError, setSubmitError] = useState<string>("");

  const handleAddressFileUpload = async () => {
    const { assets, canceled} : DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync();
    
    if (!canceled) {
      if (assets.length > 0) {
        const asset : DocumentPicker.DocumentPickerAsset = assets[0];

        if (asset.mimeType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          console.log(asset);
          setAddressFile(asset);
          setAddressFileError("");
        } else {
          setAddressFileError("File must be of type .xlsx");
        }
      }
    }
  }

  const handleFormFileUpload = async () => {
    const { assets, canceled} : DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync();
    
    if (!canceled) {
      if (assets.length > 0) {
        const asset : DocumentPicker.DocumentPickerAsset = assets[0];

        if (asset.mimeType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          setFormFile(asset);
          setFormFileError("");
        } else {
          setFormFileError("File must be of type .xlsx");
        }
      }
    }
  }

  const handleSubmit = async () => {
    if (addressFile == undefined || formFile == undefined) {
      setSubmitError("Missing at least one of 'Address List' form or 'Disaster Impact Questions' form.")
    } else {
      const data = await FileSystem.readAsStringAsync(addressFile.uri, {encoding: FileSystem.EncodingType.Base64});
      const wb = XLSX.read(data, {type: "base64"});

      const ws = wb.Sheets[wb.SheetNames[0]];

      console.log(XLSX.utils.sheet_to_json(ws))
    }
  }

  return (
      <KeyboardAvoidingView 
        behavior="position"
        keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 0}
        contentContainerStyle={{alignItems: 'center'}}
      >
        <ScrollView style={{width: "100%"}} contentContainerStyle={styles.body}>
          <Text style={styles.pageTitle}>New Event</Text>
          <View style={styles.section}>
            <Image source={require("txcdr-client/assets/map.png")} style={styles.map}/>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Event Name</Text>
            <TextInput value={eventName} maxLength={30} onChangeText={(text: string) => setEventName(text)} style={{...styles.input, fontSize: 20}} />
            <Text style={styles.footer}>30 characters max</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Select start date</Text>
            <View style={{alignItems: "flex-start", marginTop: 16}}>
              <DateTimePicker 
                value={startDate}
                mode="date"
                onChange={(event, selectedDate) => {
                  setStartDate(selectedDate || new Date());
                }}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Create Description</Text>
            <TextInput value={description} maxLength={200} onChangeText={(text: string) => setDescription(text)} style={{...styles.input, height: 200, fontSize: 16}} multiline />
            <Text style={styles.footer}>200 characters max</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Upload Forms</Text>
            <View style={styles.uploadSection}>
              <Text style={{...styles.title, fontSize: 14}}>Address List</Text>
              <Pressable style={styles.uploadButton} onPress={handleAddressFileUpload}>
                <Icon name="file-upload-outline" color="#8C8C8C" size={28} style={{marginRight: 16}}/>
                <Text style={{...styles.title, fontSize: 14}}>{addressFile == undefined ? "Upload file" : addressFile.name}</Text>
              </Pressable>
              {addressFileError != "" && <Text style={{...styles.footer, color: "red"}}>{addressFileError}</Text>}
            </View>
            <View style={styles.uploadSection}>
              <Text style={{...styles.title, fontSize: 14}}>Disaster Impact Questions</Text>
              <Pressable style={styles.uploadButton} onPress={handleFormFileUpload}>
                <Icon name="file-upload-outline" color="#8C8C8C" size={28} style={{marginRight: 16}}/>
                <Text style={{...styles.title, fontSize: 14}}>{formFile == undefined ? "Upload file" : formFile.name}</Text>
              </Pressable>
              {formFileError != "" && <Text style={{...styles.footer, color: "red"}}>{formFileError}</Text>}
            </View>
          </View>
          <View style={{...styles.section, marginBottom: 50}}>
            <Pressable onPress={handleSubmit} style={{height: 60, backgroundColor: "#5360F3", alignItems: "center", justifyContent: "center", borderRadius: 30}}>
              <Text style={{color: "white", fontSize: 18}}>Create Event</Text>
            </Pressable>
            {submitError != "" && <Text style={{...styles.footer, color: "red"}}>{submitError}</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    width: "90%",
    alignSelf: "flex-start"
  },
  body: {
    width: "90%",
    alignSelf: "center"
  },
  map: {
    width: "100%", 
    aspectRatio: 1, 
    borderRadius: 25, 
    alignSelf: "center"
  },
  section: {
    marginTop: 24
  },
  title: {
    fontSize: 20,
    fontWeight: "500"
  },
  input: {
    height: 60,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 12,
  },
  footer: {
    fontStyle: "italic", 
    color: "#8C8C8C", 
    marginTop: 8
  },
  uploadSection: {
    marginTop: 24
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
    marginTop: 12
  }
});