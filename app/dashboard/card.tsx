import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Severity from "./severity";

type CardProps = {
  title: string;
  id: string;
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
      <Pressable onPress={onPressFunction}>
      <ImageBackground
            style={styles.mapIcon}
            imageStyle={{     borderTopRightRadius: 10,     borderTopLeftRadius: 10,
            }}
            source={require("txcdr-client/assets/map.png")}
          >
            <Severity text={props.severity}></Severity>

          </ImageBackground>
        <SafeAreaView style={styles.container}>
          
          <SafeAreaView style={styles.primary}>
            <Image
              style={styles.pinIcon}
              source={require("txcdr-client/assets/pin.png")}
            ></Image>
            <Text style={styles.title}>{props.title}</Text>

            {isPending && (<SafeAreaView style={styles.status}>
              <Text style={styles.statusLabel}>PENDING</Text>
            </SafeAreaView>
            )}
          </SafeAreaView>
        </SafeAreaView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    height: 55,
    // backgroundColor: "#D3D3D3",
    backgroundColor: "#5360F3",
    alignSelf: "center",
    // borderRadius: 10,
    paddingTop: -5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  mapIcon: {
    backgroundColor: "white",
    width: 330,
    height: 90,
    alignSelf: "center",

  },
  primary: {
    paddingTop: -30,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inline: {
    
  },
  pinIcon: {
    width: 25,
    height: 25,
  },
  homeIcon: {
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
  secondary: {
    paddingTop: -15,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  caption: {
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 5,
    width: 60,
    textAlign: "left",
    fontWeight: "bold",
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
  spacer: {
    paddingLeft: 90,
  },
  progressBarContainer: {
    paddingTop: -40,
  }
});
