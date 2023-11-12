import { Slot } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <View style={{ backgroundColor: "#f5f5f5", height: insets.top }} />
      <SafeAreaView className="flex-1 bg-gray-200" edges={["bottom"]}>
        <Slot />
      </SafeAreaView>
    </View>
  );
}
