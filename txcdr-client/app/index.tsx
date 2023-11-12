import { Link } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native";

export default function Page() {
  return (
    <View>
      <Text className="text-2xl font-bold">Root page</Text>
      <Link href="/volunteer/map" className="py-2">
        Go to map page
      </Link>
      <Link href="/login" className="py-2">
        Go to login page
      </Link>
      <Link href="/volunteer/home" className="py-2">
        Go to home page
      </Link>
    </View>
  );
}
