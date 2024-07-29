import { Link, router, useLocalSearchParams } from "expo-router";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { Severity } from "../dashboard/SeverityCard";
import CensusBlock from "./censusBlock";
import { fetchEvent } from "../../../mock-api/events";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Tables } from "../../../types/supabase";
import { supabase } from "../../../utils/supabase";

export default function Page() {
  const local = useLocalSearchParams();
  const [event, setEvent] = useState<Tables<"Event">>();
  const [numVolunteers, setNumVolunteers] = useState<number>();
  const [numSurveyed, setNumSurveyed] = useState<number>();
  const [numAddressses, setNumAddresses] = useState<number>();
  const [eventCreator, setEventCreator] = useState<Tables<"User2">["name"]>();

  // Get the event
  useEffect(() => {
    const func = async () => {
      const event = await supabase
        .from("Event")
        .select("*")
        .eq("id", parseInt(local.slug as string))
        .single();
      if (event.error) {
        console.log(event.error);
        Alert.alert("Failed to fetch event", event.error.message);
        router.back();
        return;
      }

      console.log(event.data);
      setEvent(event.data);
    };
    func();
  }, []);

  // Get number of volunteers
  useEffect(() => {
    const func = async () => {
      if (event) {
        // Get the number of volunteers
        const numVolunteers = await supabase
          .from("EventVolunteer")
          .select("*", { count: "exact" })
          .eq("eventId", event.id);
        if (numVolunteers.error || numVolunteers.count == null) {
          console.log(numVolunteers.error);
          Alert.alert(
            "Failed to fetch number of volunteers",
            numVolunteers?.error?.message ??
              "Unknown error, couldn't fetch exact number of volunteers",
          );
          router.back();
          return;
        }

        setNumVolunteers(numVolunteers.count);
      }
    };
    func();
  }, [event]);

  // Get address stats
  useEffect(() => {
    const func = async () => {
      if (event) {
        const addresses = await supabase
          .from("EventAddress")
          .select("id, claimerId", { count: "exact" })
          .eq("eventId", event.id);

        if (addresses.error || addresses.count == null) {
          console.log(addresses.error);
          Alert.alert(
            "Failed to fetch number of surveyed addresses",
            addresses?.error?.message ??
              "Unknown error, couldn't fetch exact number of surveyed addresses",
          );
          router.back();
          return;
        }

        let numClaimed = 0;
        let numTotal = 0;
        for (const address of addresses.data) {
          numTotal++;
          numClaimed += +(address.claimerId != null);
        }

        setNumSurveyed(numClaimed);
        setNumAddresses(numTotal);
      }
    };
    func();
  }, [event]);

  // Get the event creator
  useEffect(() => {
    const func = async () => {
      if (event) {
        const creator = await supabase
          .from("User2")
          .select("name")
          .eq("id", event.creatorId)
          .single();
        if (creator.error) {
          console.log(creator.error);
          Alert.alert("Failed to fetch event creator", creator.error.message);
          router.back();
          return;
        }

        setEventCreator(creator.data.name);
      }
    };
    func();
  }, [event]);

  if (!event) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <View style={styles.header}>
        <Link href="/dashboard">
          <Image
            style={styles.backIcon}
            source={require("../../../assets/back.png")}
          ></Image>
        </Link>

        <Text style={styles.pageTitle}>{event.title}</Text>
      </View>

      <ScrollView>
        <View style={styles.body}>
          <ImageBackground
            style={styles.mapIcon}
            source={require("../../../assets/map.png")}
          >
            <Severity text={event.severity!}></Severity>
          </ImageBackground>

          <View
            style={[styles.inline, { paddingTop: 20 }, { paddingBottom: 20 }]}
          >
            <View style={[styles.backgroundBox, { paddingTop: 15 }]}>
              <View style={styles.inline}>
                <Image
                  style={styles.smallIcon}
                  source={require("../../../assets/house.png")}
                ></Image>

                <Text style={styles.bigCaption}>
                  {numSurveyed}/{numAddressses}
                </Text>
              </View>
              <Text style={styles.caption}>claimed houses</Text>
            </View>

            <View style={styles.spacer}></View>

            <View style={[styles.backgroundBox, { paddingTop: 15 }]}>
              <View style={styles.inline}>
                <Image
                  style={styles.smallIcon}
                  source={require("../../../assets/person.png")}
                ></Image>
                <Text style={styles.bigCaption}>{numVolunteers}</Text>
              </View>
              <Text style={styles.caption}>volunteers</Text>
            </View>
          </View>

          <View style={styles.description}>
            <Text>{event.description}</Text>
          </View>

          {/* {event.registered && (
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
              <Text style={styles.heading}>Census Block</Text>
              <CensusBlock censusNumber="#1234"></CensusBlock>
              <CensusBlock censusNumber="#5678"></CensusBlock>
              <CensusBlock censusNumber="#9999"></CensusBlock>
              <CensusBlock censusNumber="#1000"></CensusBlock>
            </View>
          )} */}

          <View style={{ marginRight: 40 }}>
            <Text style={styles.heading}>Created by</Text>
            <View style={styles.inline}>
              <Image
                style={styles.contactIcon}
                source={require("../../../assets/person.png")}
              ></Image>
              <Text style={styles.contactName}>{eventCreator}</Text>
              {/* Rounded icons for email and phone */}
              <Pressable
                style={[
                  styles.iconButton,
                  {
                    marginLeft: "auto",
                    marginRight: 15,
                  },
                ]}
              >
                <Ionicons name="mail" color="white" size={25}></Ionicons>
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Ionicons name="call" color="white" size={25}></Ionicons>
              </Pressable>
            </View>
          </View>

          <Pressable style={{ alignSelf: "center", paddingTop: 35 }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </Pressable>

          <View style={styles.footer}></View>
        </View>
      </ScrollView>
    </>
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
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 40,
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
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 15,
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#5360F3",
    width: 300,
    height: 50,
    borderRadius: 15,
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

  iconButton: {
    backgroundColor: "#5360F3",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
