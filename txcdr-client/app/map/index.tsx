import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";

export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl">Map page</Text>
      <Link href="/">Go back to home page</Link>
      <MapView className="w-full h-full" />
    </SafeAreaView>
  );
}
