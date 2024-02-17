import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Severity from "./severity";

type CardProps = {
  title: string;
  id?: string;
  status: string;
  maxHouse: string;
  house: string;
  severity: string;
};

export default function Card(props: CardProps) {
  const isPending = props.status == "Pending";

  function onPressFunction(event: GestureResponderEvent): void {}

  return (
    <Link href="/event" asChild>
      <Pressable
        onPress={onPressFunction}
        style={{
          width: 330,
          height: 160,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <ImageBackground
          style={styles.map}
          imageStyle={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            width: "100%",
            height: "100%",
          }}
          source={require("txcdr-client/assets/map.png")}
        >
          <Severity text={props.severity}></Severity>
        </ImageBackground>

        <View style={styles.container}>
          <Image
            style={styles.pinIcon}
            source={require("txcdr-client/assets/pin.png")}
          ></Image>

          <Text style={styles.title}>{props.title}</Text>

          {isPending && (
            <View style={styles.status}>
              <Text style={styles.statusLabel}>PENDING</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "35%",
    backgroundColor: "#5360F3",
    alignSelf: "center",
    paddingTop: 10,
    paddingLeft: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,

    flexDirection: "row",
    flexWrap: "wrap",
  },
  map: {
    width: "100%",
    height: "65%",
    alignSelf: "center",
  },
  inline: {
    paddingTop: -25,
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

  status: {
    backgroundColor: "#8C8C8C",
    borderRadius: 10,
    height: 20,
    paddingTop: -25,
  },
  statusLabel: {
    color: "white",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
});
