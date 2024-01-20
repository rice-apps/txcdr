import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "./dashboard/progressBar";
import Severity from "./dashboard/severity";


export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold">Home page</Text>
      <Link href="/map">Go to map page</Link>
      <Link href="/dashboard">Go to dashboard page</Link>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});