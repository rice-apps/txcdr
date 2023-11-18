import { Slot } from "expo-router";
import { NavBar } from "./NavBar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VolunteerLayout() {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <Slot />
      </View>
      <View className="ml-4">
        <NavBar />
      </View>
    </View>
  );
}
