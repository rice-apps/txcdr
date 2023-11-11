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
          <Card title="Houston, Texas"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Houston, Texas"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Houston, Texas"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Houston, Texas"></Card>
        </SafeAreaView>
        <SafeAreaView>
          <Card title="Houston, Texas"></Card>
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
