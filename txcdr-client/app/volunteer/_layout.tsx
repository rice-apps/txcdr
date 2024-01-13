import { Slot } from "expo-router";
import { NavBar } from "./NavBar";
import { View } from "react-native";

/**
 * Layout for volunteer pages; appends a navigation bar to the bottom of the page
 * @returns Volunteer pages with nav bar
 */
export default function VolunteerLayout() {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <Slot />
      </View>
      <NavBar />
    </View>
  );
}
