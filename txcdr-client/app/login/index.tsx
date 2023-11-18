import { Link } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";

/**
 * Main page component for the map page
 * @returns React map page component
 */
export default function Page() {
  return (
    <View>
      <Text className="text-2xl">Map page</Text>
      <Link href="/" className="py-3">
        Go back to home page
      </Link>
    </View>
  );
}
