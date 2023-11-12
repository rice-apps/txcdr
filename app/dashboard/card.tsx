import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CardProps = {
  title: string;
  id: string;
  status: boolean;
  maxHouse: string;
  house: string;

};

export default function Card(props: CardProps) {
  const id = props.id;
  const status = props.status;

  function onPressFunction(event: GestureResponderEvent): void {}
  return (
    <Link href="/event" asChild>
      <Pressable onPress={onPressFunction}>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.mapIcon}
            source={require("txcdr-client/assets/map.png")}
          ></Image>
          <SafeAreaView style={styles.primary}>
            <Image
              style={styles.pinIcon}
              source={require("txcdr-client/assets/pin.png")}
            ></Image>
            <Text style={styles.title}>{props.title}</Text>
            <Image
              style={styles.homeIcon}
              source={require("txcdr-client/assets/house.png")}
            ></Image>
            <Text style={styles.caption}>{props.house}/{props.maxHouse}</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.secondary}>
            <SafeAreaView style={styles.status}>
              <Text style={styles.statusLabel}>PENDING</Text>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    height: 150,
    backgroundColor: "#D3D3D3",
    alignSelf: "center",
    borderRadius: 10,
    paddingTop: -5,
  },
  mapIcon: {
    backgroundColor: "white",
    width: 300,
    height: 70,
    alignSelf: "center",
    borderRadius: 8,
  },
  primary: {
    paddingTop: -15,
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
    paddingTop: -20,
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
  progressBar: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 120,
  },

  progressBarFilled: {
    backgroundColor: "red",
    borderRadius: 10,
    height: 1,
    paddingTop: -15,
  },
});
