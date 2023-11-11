import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Map } from "./Map";

/**
 * Main page component for the map page
 * @returns React map page component
 */
export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl">Map page</Text>
      <Link href="/" className="py-3">
        Go back to home page
      </Link>
      <Map />
    </SafeAreaView>
  );
}
