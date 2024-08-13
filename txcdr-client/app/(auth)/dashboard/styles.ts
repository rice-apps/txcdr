import { StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";

export const CommonStyles = StyleSheet.create({
  scroller: {
    paddingBottom: 50,
    marginTop: ms(20),
    overflow: "scroll",
  },
  eventList: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "95%",
    gap: ms(20),
    marginTop: ms(20),
  },
});
