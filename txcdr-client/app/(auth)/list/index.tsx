import { Text, View, StyleSheet, ScrollView } from "react-native";

/**
 * List page
 * @returns List page component
 */
export default function Page() {
  return (
    <View>
      <Text style={styles.pageTitle}>Volunteer Dashboard</Text>
      <ScrollView
        style={styles.scroller}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.userCard}>
          <Text style={{fontSize: 22, marginVertical: 8}}>Katharine Bonilla</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    width: "90%",
    alignSelf: "center",
  },
  scroller: {
    paddingTop: 20,
    paddingBottom: 50,
    width: "100%"
  },
  userCard: {
    width: "90%",
    paddingHorizontal: 10,
    alignSelf: "center",           
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: "#000",
    elevation: 2,
    backgroundColor: "#5360F3",
    borderRadius: 15
  }
});
