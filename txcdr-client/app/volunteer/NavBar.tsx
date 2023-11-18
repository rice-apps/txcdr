import { View } from "react-native";
import { NavBarButton } from "./NavBarButton";
import {
  HomeNormal,
  HomeFilled,
  MapNormal,
  MapFilled,
  ListNormal,
  ListFilled,
  ProfileNormal,
  ProfileFilled,
} from "../../assets/svgs/NavBarIcons";

export function NavBar() {
  return (
    <View className="flex-row gap-2 justify-evenly bg-gray-200 items-center align-middle">
      <NavBarButton svg={HomeNormal} href="/volunteer/home" label="HOME" />
      <NavBarButton svg={MapNormal} href="/volunteer/map" label="MAP" />
      <NavBarButton svg={ListNormal} href="/volunteer/home" label="LIST" />
      <NavBarButton
        svg={ProfileNormal}
        href="/volunteer/home"
        label="PROFILE"
      />
    </View>
  );
}
