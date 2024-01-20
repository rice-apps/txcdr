import { Link } from "expo-router";
import { Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "./card";

export default function Page() {
  return (
    <SafeAreaView>
      <Text style={styles.pageTitle}>Event Dashboard</Text>
      <ScrollView style={styles.scroller}>
        <SafeAreaView>
          <Card title="Houston, Texas" house="3" maxHouse="30" severity="Moderate"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Austin, Texas" house="10" maxHouse="30" severity="Severe"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="El Paso, Texas" house="2" maxHouse="10" severity="Low"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Dallas, Texas" house="9" maxHouse="80" severity="Severe"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Houston, Texas" house="14" maxHouse="50" severity="Moderate"></Card>
        </SafeAreaView>
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
  },

  footer: {
    textAlign: "center",
  },
});
