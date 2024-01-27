import { Link } from "expo-router";
import { Text, StyleSheet, Image, Pressable, GestureResponderEvent, ScrollView, ImageBackground, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../dashboard/progressBar";
import Severity from "../dashboard/severity";
import CensusBlock from "./censusBlock";

export default function Page() {

  const eventName = "Cypress Area Disaster";
  const numOfVolunteers = 50;
  const numOfSurveyed = 6;
  const numOfAddresses = 30;
  const severity = "Moderate";
  const description = "Join us in Cypress, Texas, for a crucial disaster canvassing event aimed at supporting our community in times of need. As we come together, volunteers will go door-to-door to provide information, resources, and assistance to those affected by recent disasters. Your participation can make a significant impact, helping us build resilience and solidarity in Cypress during challenging times.";
  const contactName = "Gary Flaharty";
  const isRegistered = true;


  return (
    <SafeAreaView style={styles.margins}>
      <SafeAreaView style={styles.header}>
        <Link href="/dashboard">
          <Image
            style={styles.backIcon}
            source={require("txcdr-client/assets/back.png")}
          ></Image>
        </Link>
        <Text style={styles.pageTitle}>{eventName}</Text>
        
      </SafeAreaView>

      <ScrollView>
        <SafeAreaView style={styles.body}>
          <ImageBackground
            style={styles.mapIcon}
            source={require("txcdr-client/assets/map.png")}
          >          
          <Severity text = {severity}></Severity>
          </ImageBackground>


<SafeAreaView style={styles.inline}>
          <SafeAreaView style={styles.backgroundBox}>
            <SafeAreaView style={styles.inline}>
              <Image
                style={styles.smallIcon}
                source={require("txcdr-client/assets/house.png")}
              ></Image>
              <Text style={styles.bigCaption}>{numOfSurveyed}/{numOfAddresses}</Text>
            </SafeAreaView>
          
            <Text style={styles.caption}>claimed houses</Text>

          </SafeAreaView>

          <SafeAreaView style={styles.spacer}></SafeAreaView>

          <SafeAreaView style={styles.backgroundBox}>
            <SafeAreaView style={styles.inline}>
              <Image
                style={styles.smallIcon}
                source={require("txcdr-client/assets/person.png")}
              ></Image>
              <Text style={styles.bigCaption}>{numOfVolunteers}</Text>
            </SafeAreaView>
            <Text style={styles.caption}>volunteers</Text>

          </SafeAreaView>
        </SafeAreaView>

        <SafeAreaView style={styles.description}>
          <Text>{description}</Text>
          <Link href="/">Go back to home page</Link>
        </SafeAreaView>
        <ProgressBar></ProgressBar>


        {isRegistered && (
        <SafeAreaView>
          <Text style={styles.heading}>Census Block</Text>
          <CensusBlock></CensusBlock>
          <CensusBlock></CensusBlock>
          <CensusBlock></CensusBlock>
          <CensusBlock></CensusBlock>
          
 
        </SafeAreaView>
        )}


        <SafeAreaView>
          <Text style={styles.heading}>Created by</Text>
          <SafeAreaView style={styles.inline}>
            <Image style={styles.contactIcon}
source={require("txcdr-client/assets/person.png")}></Image>
            <Text style={styles.contactName}>{contactName}</Text>
          </SafeAreaView>
        </SafeAreaView>

          <SafeAreaView></SafeAreaView>

        <Pressable>
          <SafeAreaView style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </SafeAreaView>
        </Pressable>

        <SafeAreaView style={styles.footer}></SafeAreaView>


        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
    

  );
}



const styles = StyleSheet.create({
  header: {
    paddingTop: -30,
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
    width: 20,
  },
  description: {
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  margins: {
    // paddingLeft: 35,
    // paddingRight: 35, 
    alignContent: "center",
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
    bottom: 8,
  },

  footer: {
    height: 75,
  }

  

  

});