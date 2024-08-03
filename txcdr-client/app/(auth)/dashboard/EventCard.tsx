import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
} from "react-native";
import { Severity } from "./SeverityCard";
import { Tables } from "../../../types/supabase";
import { ApprovalCard } from "./ApprovalCard";
import { router } from "expo-router";
import { ms } from "react-native-size-matters";

type CardProps = {
  id: number;
  title: string;
  severity: Tables<"Event">["severity"];
  registered: boolean | null;
};

export function EventCard(props: CardProps) {
  return (
    <Pressable
      style={{
        width: "100%",
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
      }}
      onPress={() => router.push(`/event/${props.id}`)}
    >
      <ImageBackground
        style={styles.map}
        imageStyle={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          alignItems: "center",
        }}
        source={require("../../../assets/map.png")}
      >
        <Severity
          style={{ alignSelf: "flex-end", marginTop: 10, marginRight: 10 }}
          text={props.severity ?? "Low"}
        ></Severity>
      </ImageBackground>

      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.pinIcon}
            source={require("../../../assets/pin.png")}
          ></Image>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        {props.registered != null && (
          <ApprovalCard approved={props.registered} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#5360F3",
    alignSelf: "center",
    paddingLeft: 10,
    paddingVertical: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    gap: ms(12),
  },
  map: {
    height: ms(100),
  },
  inline: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pinIcon: {
    width: 25,
    height: 25,
  },
  title: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: "left",
    fontWeight: "bold",
    width: 200,
    fontSize: 16,
    color: "white",
  },
});
