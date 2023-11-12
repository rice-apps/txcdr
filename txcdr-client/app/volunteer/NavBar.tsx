import { View } from "react-native";
import { NavBarButton } from "./NavBarButton";

export function NavBar() {
  return (
    <View className="flex-row gap-2 justify-evenly bg-gray-200 items-center align-middle">
      <NavBarButton href="/volunteer/home" label="HOME" />
      <NavBarButton href="/volunteer/map" label="MAP" />
      <NavBarButton href="/volunteer/home" label="LIST" />
      <NavBarButton href="/volunteer/home" label="PROFILE" />
    </View>
  );
}
