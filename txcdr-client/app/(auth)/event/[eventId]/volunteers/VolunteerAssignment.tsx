import { Pressable, StyleSheet, View } from "react-native";
import { User } from ".";
import { ms } from "react-native-size-matters";
import { UserInfo } from "../../../../../components/UserInfo";
import { DText } from "../../../../../components/styled-rn/DText";
import { Blue } from "../../../../../utils/styles/colors";

interface Props {
  eventId: string;
  user: User;
}

export function VolunteerAssignment({ user }: Props) {
  return (
    <View style={styles.container}>
      <UserInfo name={user.name} subtext={user.organizations} />
      <Pressable style={[styles.button, { backgroundColor: Blue[500] }]}>
        <DText style={{ color: "white" }}>Assign block</DText>
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
});
