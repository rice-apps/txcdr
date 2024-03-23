import { Link } from "expo-router";
import { Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "./card";
import { fetchEvent } from "../../../mock-api/events";

export default function Page() {
  return (
    <SafeAreaView>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* TODO: replace mock API calls with real ones */}
        <Card event={fetchEvent(1)}></Card>
        <Card event={fetchEvent(2)}></Card>
        <Card event={fetchEvent(3)}></Card>
        <Card event={fetchEvent(4)}></Card>
        <Card event={fetchEvent(5)}></Card>
        <SafeAreaView style={styles.footer}></SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  scroller: {
    paddingBottom: 50,
    width: "100%",
  },

  footer: {
    // textAlign: "center",
    height: 60,
  },
});
