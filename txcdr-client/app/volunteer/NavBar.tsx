import { View } from "react-native";
import { NavBarButton } from "./NavBarButton";

export function NavBar() {
  return (
    <View className="flex-row gap-2 justify-evenly bg-gray-200 items-center align-middle">
      <NavBarButton />
      <NavBarButton />
      <NavBarButton />
      <NavBarButton />
    </View>
  );
}
