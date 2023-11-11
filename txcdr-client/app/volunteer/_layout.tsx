import { Slot } from "expo-router";
import { NavBar } from "./NavBar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VolunteerLayout() {
  return (
    <View className="flex flex-col justify-between">
      <Slot />
      <SafeAreaView className="w-full absolute bottom-0">
        <NavBar />
      </SafeAreaView>
    </View>
  );
}
