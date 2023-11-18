import { View } from "react-native";
import { NavBarButton } from "./NavBarButton";
import { HomeIcon } from "./HomeIcon";
import { MapIcon } from "./MapIcon";
import { PersonIcon } from "./PersonIcon";
import { ListIcon } from "./ListIcon";

export function NavBar() {
  return (
    <View className="flex-row gap-2 justify-evenly bg-gray-200 items-center align-middle">
      <NavBarButton svg={HomeIcon} href="/volunteer/home" label="HOME" />
      <NavBarButton svg={MapIcon} href="/volunteer/map" label="MAP" />
      <NavBarButton svg={ListIcon} href="/volunteer/home" label="LIST" />
      <NavBarButton svg={PersonIcon} href="/volunteer/home" label="PROFILE" />
    </View>
  );
}
