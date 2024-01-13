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

/**
 * Bottom navigation bar
 * @returns Nav bar component
 */
export function NavBar() {
  return (
    <View className="flex-row gap-2 justify-evenly bg-gray-200 items-center align-middle">
      <NavBarButton
        idleSvg={HomeNormal}
        activeSvg={HomeFilled}
        href="/volunteer/home"
        label="HOME"
      />
      <NavBarButton
        idleSvg={MapNormal}
        activeSvg={MapFilled}
        href="/volunteer/map"
        label="MAP"
      />
      <NavBarButton
        idleSvg={ListNormal}
        activeSvg={ListFilled}
        href="/volunteer/list"
        label="LIST"
      />
      <NavBarButton
        idleSvg={ProfileNormal}
        activeSvg={ProfileFilled}
        href="/volunteer/profile"
        label="PROFILE"
      />
    </View>
  );
}
