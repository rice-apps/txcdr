import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Severity } from "../dashboard/SeverityCard";
import { PageProps } from "./types";
import { Blue, Zinc } from "../../../utils/styles/colors";
import { ms, s } from "react-native-size-matters";
import * as Linking from "expo-linking";
import { WideButton } from "../../../components/buttons/WideButton";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useUser } from "../../../utils/hooks/useUser";

type RegistrationState = "APPLIED" | "APPROVED" | "NONE";
export function VolunteerPage({
  event,
  eventCreator,
  numAddresses,
  numSurveyed,
  numVolunteers,
}: PageProps) {
  const [registration, setRegistration] = useState<RegistrationState>("NONE");
  const user = useUser();

  useEffect(() => {
    const func = async () => {
      if (!user) return;
      const res = await supabase
        .from("EventVolunteer")
        .select("approved")
        .eq("eventId", event?.id)
        .eq("volunteerId", user.id)
        .single();

      if (!res.error && res.data) {
        setRegistration(res.data.approved ? "APPROVED" : "APPLIED");
      }

      console.log(res);
    };
    func();
  }, [user]);

  const onRegister = async () => {
    if (!user) return;

    const res = await supabase.from("EventVolunteer").insert({
      eventId: event?.id,
      volunteerId: user.id,
      approved: false,
    });

    if (res.error) {
      console.log(res.error);
      return;
    }

    setRegistration("APPLIED");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backIcon} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={ms(30)} color="black" />
      </Pressable>
      <Text style={styles.pageTitle}>{event?.title}</Text>
      <ImageBackground
        style={styles.map}
        source={require("../../../assets/map.png")}
      >
        <Severity
          appendedText=" Damage"
          style={{ alignSelf: "flex-end", right: ms(15), top: ms(10) }}
          text={event?.severity!}
        ></Severity>
      </ImageBackground>
      <View style={[styles.container, styles.body]}>
        <View style={styles.statBoxRow}>
          <View style={styles.statBox}>
            <View style={styles.statHeaderRow}>
              <Octicons name="home" color="white" size={32} />
              <Text style={styles.statHeaderText}>
                {numSurveyed}/{numAddresses}
              </Text>
            </View>
            <Text style={styles.statSubtext}>surveyed addresses</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.statHeaderRow}>
              <FontAwesome5 name="user" color="white" size={32} />
              <Text style={styles.statHeaderText}>{numVolunteers}</Text>
            </View>
            <Text style={styles.statSubtext}>registered volunteers</Text>
          </View>
        </View>
        <Text>{event?.description}</Text>
        <View style={styles.contactInfoContainer}>
          <Text style={styles.contactInfoHeader}>Created by</Text>
          <View style={styles.contactInfoRow}>
            <View style={styles.contactInfoPair}>
              <MaterialIcons name="account-circle" size={ms(48)} />
              <Text style={styles.contactName}>{eventCreator?.name}</Text>
            </View>
            <View style={styles.contactInfoPair}>
              <Pressable
                style={[
                  styles.contactButton,
                  eventCreator?.email ? {} : { backgroundColor: "gray" },
                ]}
                onPress={() => Linking.openURL(`mailto:${eventCreator?.email}`)}
                disabled={!eventCreator?.email}
              >
                <MaterialIcons name="mail" color="white" size={ms(18)} />
              </Pressable>
              <Pressable
                style={[
                  styles.contactButton,
                  eventCreator?.phone ? {} : { backgroundColor: "gray" },
                ]}
                onPress={() => Linking.openURL(`tel:${eventCreator?.phone}`)}
                disabled={!eventCreator?.phone}
              >
                <MaterialIcons name="call" color="white" size={ms(18)} />
              </Pressable>
            </View>
          </View>
        </View>
        <WideButton
          style={{
            backgroundColor: registration == "NONE" ? Blue[400] : Zinc[400],
          }}
          onPress={onRegister}
          disabled={registration != "NONE"}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", fontSize: ms(18) }}
          >
            {registration == "NONE"
              ? "Register"
              : registration == "APPLIED"
              ? "Pending"
              : "Registered"}
          </Text>
        </WideButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(30),
  },
  backIcon: {
    position: "absolute",
    left: ms(20),
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: ms(24),
    alignSelf: "center",
  },
  map: {
    width: "100%",
    height: ms(175),
  },
  body: {
    width: "85%",
    alignSelf: "center",
  },
  statBox: {
    backgroundColor: Blue[500],
    borderRadius: ms(10),
    padding: ms(12),
    alignItems: "center",
    justifyContent: "center",
    gap: ms(5),
  },
  statBoxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    gap: ms(10),
  },
  statHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(10),
  },
  statHeaderText: { color: "white", fontWeight: "bold", fontSize: ms(18) },
  statSubtext: { color: "white", fontWeight: "bold", fontSize: ms(12) },
  contactInfoContainer: {
    width: "100%",
    alignSelf: "center",
    gap: ms(10),
  },
  contactInfoHeader: {
    color: Blue[500],
    fontSize: ms(18),
    fontWeight: "bold",
  },
  contactInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactInfoPair: {
    flexDirection: "row",
    alignItems: "center",
    gap: s(10),
  },
  contactName: {
    fontSize: ms(18),
    fontWeight: "bold",
  },
  contactButton: {
    backgroundColor: Blue[400],
    borderRadius: ms(50),
    padding: ms(10),
  },
});

// return (
//   <>
//     <View style={styles.header}>
//       <Link href="/dashboard">
//         <Image
//           style={styles.backIcon}
//           source={require("../../../assets/back.png")}
//         ></Image>
//       </Link>

//       <Text style={styles.pageTitle}>{event?.title}</Text>
//     </View>

//     <ScrollView>
//       <View style={styles.body}>
//         <ImageBackground
//           style={styles.mapIcon}
//           source={require("../../../assets/map.png")}
//         >
//           <Severity text={event?.severity!}></Severity>
//         </ImageBackground>

//         <View
//           style={[styles.inline, { paddingTop: 20 }, { paddingBottom: 20 }]}
//         >
//           <View style={[styles.backgroundBox, { paddingTop: 15 }]}>
//             <View style={styles.inline}>
//               <Image
//                 style={styles.smallIcon}
//                 source={require("../../../assets/house.png")}
//               ></Image>

//               <Text style={styles.bigCaption}>
//                 {numSurveyed}/{numAddresses}
//               </Text>
//             </View>
//             <Text style={styles.caption}>claimed houses</Text>
//           </View>

//           <View style={styles.spacer}></View>

//           <View style={[styles.backgroundBox, { paddingTop: 15 }]}>
//             <View style={styles.inline}>
//               <Image
//                 style={styles.smallIcon}
//                 source={require("../../../assets/person.png")}
//               ></Image>
//               <Text style={styles.bigCaption}>{numVolunteers}</Text>
//             </View>
//             <Text style={styles.caption}>volunteers</Text>
//           </View>
//         </View>

//         <View style={styles.description}>
//           <Text>{event?.description}</Text>
//         </View>

//         {/* {event.registered && (
//           <View style={{ paddingTop: 20, paddingBottom: 20 }}>
//             <Text style={styles.heading}>Census Block</Text>
//             <CensusBlock censusNumber="#1234"></CensusBlock>
//             <CensusBlock censusNumber="#5678"></CensusBlock>
//             <CensusBlock censusNumber="#9999"></CensusBlock>
//             <CensusBlock censusNumber="#1000"></CensusBlock>
//           </View>
//         )} */}

//         <View style={{ marginRight: 40 }}>
//           <Text style={styles.heading}>Created by</Text>
//           <View style={styles.inline}>
//             <Image
//               style={styles.contactIcon}
//               source={require("../../../assets/person.png")}
//             ></Image>
//             <Text style={styles.contactName}>{eventCreator?.name}</Text>
//             {/* Rounded icons for email and phone */}
//             <Pressable
//               style={[
//                 styles.iconButton,
//                 {
//                   marginLeft: "auto",
//                   marginRight: 15,
//                 },
//               ]}
//             >
//               <Ionicons name="mail" color="white" size={25}></Ionicons>
//             </Pressable>
//             <Pressable style={styles.iconButton}>
//               <Ionicons name="call" color="white" size={25}></Ionicons>
//             </Pressable>
//           </View>
//         </View>

//         <Pressable style={{ alignSelf: "center", paddingTop: 35 }}>
//           <View style={styles.button}>
//             <Text style={styles.buttonText}>Register</Text>
//           </View>
//         </Pressable>

//         <View style={styles.footer}></View>
//       </View>
//     </ScrollView>
//   </>
// );

// const styles = StyleSheet.create({
//   header: {
//     // paddingTop: -30,
//     paddingLeft: 10,
//     paddingRight: 10,
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   inline: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     paddingLeft: 35,
//   },
//   bigCaption: {
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingTop: 10,
//     color: "white",
//     right: 10,
//   },
//   caption: {
//     textAlign: "center",
//     color: "white",
//     fontWeight: "bold",
//   },
//   smallIcon: {
//     width: 40,
//     height: 40,
//     right: 15,
//   },
//   contactIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: "black",
//     borderRadius: 40,
//   },
//   pageTitle: {
//     fontWeight: "bold",
//     fontSize: 24,
//     paddingLeft: 15,
//     paddingBottom: 15,
//   },
//   backIcon: {
//     width: 15,
//     height: 20,
//   },
//   backgroundBox: {
//     // backgroundColor: "#D3D3D3",
//     backgroundColor: "#5360F3",
//     borderRadius: 10,
//     width: 140,
//     height: 90,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: -20,
//   },
//   spacer: {
//     width: 40,
//   },
//   description: {
//     paddingTop: 0,
//     paddingBottom: 10,
//     paddingLeft: 35,
//     paddingRight: 35,
//   },
//   body: {
//     paddingTop: -30,
//   },
//   mapIcon: {
//     width: 400,
//     height: 175,
//   },
//   heading: {
//     color: "#5360F3",
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingLeft: 35,
//     paddingBottom: 10,
//   },

//   contactName: {
//     fontSize: 18,
//     fontWeight: "500",
//     paddingLeft: 15,
//     alignSelf: "center",
//   },

//   button: {
//     backgroundColor: "#5360F3",
//     width: 300,
//     height: 50,
//     borderRadius: 15,
//   },

//   buttonText: {
//     color: "white",
//     fontSize: 20,
//     left: 110,
//     paddingTop: 10,
//   },

//   footer: {
//     height: 75,
//   },

//   iconButton: {
//     backgroundColor: "#5360F3",
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
