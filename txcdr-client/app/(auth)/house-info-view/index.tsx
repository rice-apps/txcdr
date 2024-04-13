import { Link } from "expo-router";
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

export default function Page() {
    const addressName = "2413 Wichita St. ";
    const status = "Incomplete";
    const owner = "Cecilia Nguyen";
    const householdSize = "4";
    const disasterType = "Flood";
    const conditionDescription =
      "Join us in Cypress, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in Cypress during challenging times.";
    const isRegistered = true;


  return (
    <SafeAreaView style={{ alignContent: "center" }}>
        <View style={styles.header}>
        <Link href="/dashboard">
          {/* <Image
            style={styles.backIcon}
            source={require("txcdr-client/assets/back.png")}
          ></Image> */}
        </Link>

        <Text style={styles.pageTitle}>Address List</Text>
      </View>

        <ScrollView>
            
        <View style = {styles.box}>
            <View style = {styles.filling}>
                <Text style = {styles.addressHeader}>{addressName}</Text>
            </View>
            <Text style = {styles.subHeading}>STATUS</Text>
            <View
                style={styles.seperator}
                />
            <Text style = {styles.subHeading}>OWNER</Text>
            <View
                style={styles.seperator}
                />
            <Text style = {styles.subHeading}>HOUSEHOLD SIZE</Text>
            <View
                style={styles.seperator}
                />
            <Text style = {styles.subHeading}>DISASTER TYPE</Text>

            
        </View>
        <Text style = {styles.heading}>Condition</Text>
        <Text style = {styles.description}>Notes on the condition.</Text>


        <Text style = {styles.heading}>Photos</Text>
        <Text style = {styles.description}>Add horizontal image carousel?</Text>


        <Text style = {styles.heading}>Survey Forms</Text>
        <Text style = {styles.description}>The address is completely canvassed after the completion of all the forms below.</Text>

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
    seperator: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 300,
        left: 15,
    },
    backIcon: {
        width: 15,
        height: 20,
    },
    pageTitle: {
        fontWeight: "bold",
        fontSize: 24,
        paddingLeft: 15,
        paddingBottom: 15,
    },
    box: {
        borderRadius: 10,
        borderColor: "#5360F3",
        borderWidth: 2,
        width: 330,
        height: 200,
        left: 30,
    }, 
    addressHeader: {
        paddingTop: 10,
        alignSelf: "center",
        color: "white",
        fontSize: 20,

    },
    subHeading: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: "#5360F3",
        textAlign: "left",

    },
    filling: {
        backgroundColor: "#5360F3",
        width: 327,
        height: 45,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        left: 0,
    },
    heading: {
        color: "#5360F3",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 35,
        paddingBottom: 5,
        paddingTop: 20,
    },
    description: {
        paddingLeft: 35,

    },



});
