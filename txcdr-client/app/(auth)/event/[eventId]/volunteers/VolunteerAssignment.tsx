import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import { User } from ".";
import { ms } from "react-native-size-matters";
import { VolunteerDetails } from "./VolunteerDetails";
import { DText } from "../../../../../components/styled-rn/DText";
import { Blue } from "../../../../../utils/styles/colors";
import { useEffect, useState } from "react";
import { supabase } from "../../../../../utils/supabase";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  eventId: string;
  user: User;
  onDelete: () => void;
}

export function VolunteerAssignment({ user, eventId, onDelete }: Props) {
  const [blockIds, setBlockIds] = useState([]);
  const [selectedId, setSelectedId] = useState("Select");

  useEffect(() => {
    let eventIdNum = Number(eventId);
    const func = async () => {
      const { data, error } = await supabase.rpc("find_block_ids", {
        eventidnum: eventIdNum,
      });
      if (error) {
        throw error;
      }
      setBlockIds(data);
    };
    func();
  }, []);

  const showDeleteFlow = () => {
    // Logic to remove the volunteer
    Alert.alert(
      "Remove volunteer",
      "Are you sure you want to remove this volunteer from the event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => onDelete() },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <VolunteerDetails name={user.name} org={user.organizations} />
      <Pressable style={[styles.button, { backgroundColor: Blue[500] }]}>
        <Picker
          selectedValue={selectedId}
          mode="dropdown"
          style={styles.picker}
          onValueChange={async (itemValue, itemIndex) => {
            setSelectedId(itemValue);
            const { error } = await supabase
              .from("EventVolunteer")
              .update({ blockId: itemValue })
              .eq("volunteerId", user.id)
              .eq("eventId", Number(eventId));
            if (error) throw error;
          }}
        >
          {blockIds.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />;
          })}
        </Picker>
      </Pressable>
      <Pressable onPress={() => showDeleteFlow()} style={styles.button}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  button: {
    borderRadius: ms(10),
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
  },
  picker: {
    height: ms(50),
    width: ms(100),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  buttonConfirm: {
    backgroundColor: "red",
    marginTop: ms(10),
  },
  buttonCancel: {
    backgroundColor: "gray",
    marginTop: ms(10),
  },
});
