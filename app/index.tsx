import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "./dashboard/progressBar";

export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold">Home page</Text>
      <Link href="/map">Go to map page</Link>
      <Link href="/dashboard">Go to dashboard page</Link>
      <ProgressBar></ProgressBar>
    </SafeAreaView>
  );
}
