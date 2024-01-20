import { Slot } from "expo-router";
import { NavBar } from "./NavBar";
import { Text, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../auth/ctx";

/**
 * Layout for auth-protected pages; appends a navigation bar to the bottom of the page
 * @returns Auth-protected pages with nav bar
 */
export default function Layout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1">
      <View className="flex-1">
        <Slot />
      </View>
      <NavBar />
    </View>
  );
}
