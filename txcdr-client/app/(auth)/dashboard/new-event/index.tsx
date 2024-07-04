import { Alert, Pressable, StyleSheet, View } from "react-native";
import { DText } from "../../../../components/styled-rn/DText";
import { MaterialIcons } from "@expo/vector-icons";
import { msc } from "../../../../utils/size-matters-aliases";
import { Zinc } from "../../../../utils/styles/colors";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DTextInput } from "../../../../components/styled-rn/DTextInput";
import { useState } from "react";
import { StyledButton } from "../../../../components/buttons/StyledButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../../../../utils/supabase";

export default function Page() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [desc, setDesc] = useState("");

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
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <DText>New Event</DText>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="close" size={msc(32, 0.25)} color={Zinc[900]} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={styles.field}>
          <DText>Event Name</DText>
          <DTextInput style={styles.input} onChangeText={setName} />
          <DText style={{ fontStyle: "italic", color: Zinc[400] }}>
            30 characters max
          </DText>
        </View>
        <View style={styles.field}>
          <DText>Select start date</DText>
          <DateTimePicker
            value={date}
            onChange={(e) => setDate(new Date(e.nativeEvent.timestamp))}
          />
        </View>
        <View style={styles.field}>
          <DText>Create description</DText>
          <DTextInput
            style={[styles.input, { height: msc(128), paddingVertical: 20 }]}
            onChangeText={setDesc}
            multiline={true}
            textAlignVertical="top" // Add this line to move the cursor away from the border
          />
        </View>
        <StyledButton onPress={onSubmit}>
          <DText style={{ color: Zinc[100], fontWeight: "bold" }}>Submit</DText>
        </StyledButton>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  topBar: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    width: "85%",
    gap: msc(20),
  },
  field: {
    gap: 10,
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
});
