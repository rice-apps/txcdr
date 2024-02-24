import { Text, View} from "react-native";
import { Link } from "expo-router";

/**
 * List page
 * @returns List page component
 */
export default function Page() {
  return (
    <View>
      <Text>List page</Text>
      <Link href="/house-info-view" className="py-2">
        Go to house info view
      </Link>
    </View>
  );
}
