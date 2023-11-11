import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl">Map page</Text>
      <Link href="/">Go back to home page</Link>
    </SafeAreaView>
  );
}
