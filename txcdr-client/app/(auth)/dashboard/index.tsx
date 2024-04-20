import { Link } from "expo-router";
import { Text, StyleSheet, ScrollView, FlatList, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "./card";
import Icon from 'react-native-vector-icons/AntDesign';

export default function Page() {
  return (
    <View>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Card
          title="Houston, Texas"
          house="3"
          maxHouse="30"
          severity="Moderate"
          status="Pending"
        ></Card>
        <Card
          title="Austin, Texas"
          house="10"
          maxHouse="30"
          severity="Severe"
          status="Pending"
        ></Card>
        <Card
          title="El Paso, Texas"
          house="2"
          maxHouse="10"
          severity="Low"
          status="Pending"
        ></Card>
        <Card
          title="Dallas, Texas"
          house="9"
          maxHouse="80"
          severity="Severe"
          status="Pending"
        ></Card>
        <Card
          title="Houston, Texas"
          house="14"
          maxHouse="50"
          severity="Moderate"
          status="Pending"
        ></Card>
        <SafeAreaView style={styles.footer}></SafeAreaView>
      </ScrollView>
      <Link href="/new-event" asChild>
        <Pressable style={styles.newEventButton}>
          <Icon name="plus" size={20} color="white" style={{paddingRight: 4}}/>
          <Text style={{color: "white", fontSize: 20, fontWeight: 600}}>New Event</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    width: "90%",
    alignSelf: "center"
  },
  scroller: {
    paddingBottom: 50,
    width: "100%"
  },
  footer: {
    height: 60,
  },
  newEventButton: {
    position: "absolute", 
    bottom: "10%", 
    right: "5%", 
    width: "45%", 
    height: "6.5%", 
    backgroundColor: "#F1A220", 
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  }
});
