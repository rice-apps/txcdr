import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold">Home page</Text>
      <Link href="/volunteer/map" className="py-2">
        Go to map page
      </Link>
      <Link href="/login" className="py-2">
        Go to login page
      </Link>
    </SafeAreaView>
  );
}
