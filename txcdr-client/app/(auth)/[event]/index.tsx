import { Link, useLocalSearchParams } from "expo-router";
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
  ScrollView,
  ImageBackground,
  Button,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Severity from "../dashboard/severity";
import CensusBlock from "./censusBlock";
import { fetchEvent } from "../../../mock-api/events";

export default function Page() {
  const local = useLocalSearchParams();
  const event = fetchEvent(parseInt(local.event as string)); // TODO: replace mock API call with real ones

  return (
    <SafeAreaView style={{ alignContent: "center" }}>
      <View style={styles.header}>
        <Link href="/dashboard">
          <Image
            style={styles.backIcon}
            source={require("txcdr-client/assets/back.png")}
          ></Image>
        </Link>

        <Text style={styles.pageTitle}>{event.eventName}</Text>
      </View>

      <ScrollView>
        <View style={styles.body}>
          <ImageBackground
            style={styles.mapIcon}
            source={require("txcdr-client/assets/map.png")}
          >
            <Severity text={event.severity}></Severity>
          </ImageBackground>

          <View
            style={[styles.inline, { paddingTop: 20 }, { paddingBottom: 20 }]}
          >
            <View style={[styles.backgroundBox, { paddingTop: 15 }]}>
              <View style={styles.inline}>
                <Image
                  style={styles.smallIcon}
                  source={require("txcdr-client/assets/house.png")}
                ></Image>
                <Text style={styles.bigCaption}>
                  {event.numSurveyed}/{event.numAddresses}
                </Text>
              </View>

              <Text style={styles.caption}>claimed houses</Text>
            </View>

            <View style={styles.spacer}></View>

            <View style={[styles.backgroundBox, { paddingTop: 15 }]}>
              <View style={styles.inline}>
                <Image
                  style={styles.smallIcon}
                  source={require("txcdr-client/assets/person.png")}
                ></Image>
                <Text style={styles.bigCaption}>{event.numVolunteers}</Text>
              </View>
              <Text style={styles.caption}>volunteers</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Text>{event.description}</Text>
            <Link href="/">Go back to home page</Link>
          </View>

          {event.registered && (
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Text style={styles.heading}>Census Block</Text>
              <CensusBlock censusNumber="#1234"></CensusBlock>
              <CensusBlock censusNumber="#5678"></CensusBlock>
              <CensusBlock censusNumber="#9999"></CensusBlock>
              <CensusBlock censusNumber="#1000"></CensusBlock>
            </View>
          )}

          <View>
            <Text style={styles.heading}>Created by</Text>
            <View style={styles.inline}>
              <Image
                style={styles.contactIcon}
                source={require("txcdr-client/assets/person.png")}
              ></Image>
              <Text style={styles.contactName}>{event.contactName}</Text>
            </View>
          </View>

          <SafeAreaView></SafeAreaView>

          <Pressable>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </Pressable>

          <View style={styles.footer}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    // paddingTop: -30,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inline: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 35,
  },
  bigCaption: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    color: "white",
    right: 10,
  },
  caption: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  smallIcon: {
    width: 40,
    height: 40,
    right: 15,
  },
  contactIcon: {
    width: 40,
    height: 40,
    backgroundColor: "black",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  backIcon: {
    width: 15,
    height: 20,
  },
  backgroundBox: {
    // backgroundColor: "#D3D3D3",
    backgroundColor: "#5360F3",
    borderRadius: 10,
    width: 140,
    height: 90,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: -20,
  },
  spacer: {
    width: 40,
  },
  description: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  body: {
    paddingTop: -30,
  },
  mapIcon: {
    width: 400,
    height: 175,
  },
  heading: {
    color: "#5360F3",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 35,
    paddingBottom: 10,
  },

  contactName: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 10,
  },

  button: {
    backgroundColor: "#5360F3",
    width: 300,
    height: 50,
    borderRadius: 15,
    left: 35,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    left: 110,
    paddingTop: 10,
  },

  footer: {
    height: 75,
  },
});
