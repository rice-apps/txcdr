import { Alert, Pressable, StyleSheet, View } from "react-native";
import { User } from ".";
import { ms } from "react-native-size-matters";
import { UserInfo } from "../../../../../components/UserInfo";
import { DText } from "../../../../../components/styled-rn/DText";
import { Blue, Zinc } from "../../../../../utils/styles/colors";
import { useState } from "react";
import { supabase } from "../../../../../utils/supabase";

interface Props {
  eventId: string;
  user: User;
}

export function VolunteerApproval({ eventId, user }: Props) {
  const [handled, setHandled] = useState(false);

  const onApprove = async () => {
    const res = await supabase
      .from("EventVolunteer")
      .update({ approved: true })
      .eq("eventId", eventId)
      .eq("volunteerId", user.id);
    if (res.error) {
      console.log(res.error);
      Alert.alert("Failed to approve volunteer", res.error.message);
      return;
    }

    setHandled(true);
  };

  const onDelete = async () => {
    const res = await supabase
      .from("EventVolunteer")
      .delete()
      .eq("eventId", eventId)
      .eq("volunteerId", user.id);
    if (res.error) {
      console.log(res.error);
      Alert.alert("Failed to delete volunteer", res.error.message);
      return;
    }

    setHandled(true);
  };

  return (
    !handled && (
      <View style={styles.container}>
        <UserInfo name={user.name} org={user.organizations} />
        <View style={styles.buttonRow}>
          <Pressable
            onPress={onApprove}
            style={[styles.button, { backgroundColor: Blue[500] }]}
          >
            <DText style={{ color: "white" }}>Approve</DText>
          </Pressable>
          <Pressable
            onPress={onDelete}
            style={[styles.button, { backgroundColor: Zinc[200] }]}
          >
            <DText style={{ color: "black" }}>Delete</DText>
          </Pressable>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
  },
  button: {
    borderRadius: ms(10),
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
  },
});
