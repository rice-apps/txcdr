import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
        <Slot />
      </SafeAreaView>
    </View>
  );
}
