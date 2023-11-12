import { Link } from "expo-router";
import { Text, StyleSheet, Image, Pressable, GestureResponderEvent, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {

  return (
    <SafeAreaView style={styles.margins}>
      <SafeAreaView style={styles.header}>
        <Link href="/dashboard">
          <Image
            style={styles.backIcon}
            source={require("txcdr-client/assets/back.png")}
          ></Image>
        </Link>
        <Text style={styles.pageTitle}>Event Name</Text>
        
      </SafeAreaView>

      <ScrollView>
        <SafeAreaView style={styles.body}>
          <Image
            style={styles.mapIcon}
            source={require("txcdr-client/assets/map.png")}
          ></Image>

        <SafeAreaView style={styles.description}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales.</Text>
          <Link href="/">Go back to home page</Link>
        </SafeAreaView>

        <SafeAreaView style={styles.inline}>
          <SafeAreaView style={styles.backgroundBox}>
            <SafeAreaView style={styles.inline}>
              <Image
                style={styles.smallIcon}
                source={require("txcdr-client/assets/house.png")}
              ></Image>
              <Text>0/30</Text>
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
              <Text>50</Text>
            </SafeAreaView>
            <Text style={styles.caption}>volunteers</Text>

          </SafeAreaView>
        </SafeAreaView>

        


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
    },
  caption: {
    textAlign: "center",
  },
  smallIcon: {
    width: 20,
    height: 20,
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
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    width: 140,
    height: 90,
    paddingLeft: 10,
    paddingRight: 10,
  },
  spacer: {
    width: 20,
  },
  description: {
    paddingTop: 0,
    paddingBottom: 10,
  },
  margins: {
    paddingLeft: 35,
    paddingRight: 35, 
    alignContent: "center",
  },
  body: {
    paddingTop: -30,
  },
  mapIcon: {
    width : 300,
    height: 200,
  },

});