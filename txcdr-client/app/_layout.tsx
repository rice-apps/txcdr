import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../auth/ctx";

/**
 * Layout for all of the pages in the app
 * @returns Page component with layout layer
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <View className="flex-1">
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
          <Slot />
        </SafeAreaView>
      </View>
    </AuthProvider>
  );
}
