import { Link } from "expo-router";
import { Text, StyleSheet, Image, Pressable, GestureResponderEvent, ScrollView, ImageBackground} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../dashboard/progressBar";
import Severity from "../dashboard/severity";

export default function Page() {

  const eventName = "Cypress Area Disaster";
  const numOfVolunteers = 50;
  const numOfSurveyed = 6;
  const numOfAddresses = 30;
  const severity = "Moderate";
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.";


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
    height: 200,
  },

});