import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold">Home page</Text>
      <Link href="/map">Go to map page</Link>
    </SafeAreaView>
  );
}
