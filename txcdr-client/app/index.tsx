import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <Text>Home page</Text>
      <Link href="/map">Go to map page</Link>
      <Link href="/form">Go to form page</Link>
    </SafeAreaView>
  );
}
