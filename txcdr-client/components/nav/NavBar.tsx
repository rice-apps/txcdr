import { StyleSheet, View } from "react-native";
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
import { msc } from "../../utils/size-matters-aliases";
import { Zinc } from "../../utils/styles/colors";

/**
 * Bottom navigation bar
 * @returns Nav bar component
 */
export function NavBar() {
  return (
    <View style={styles.container}>
      <NavBarButton
        idleSvg={HomeNormal}
        activeSvg={HomeFilled}
        href="/dashboard"
        label="HOME"
      />
      <NavBarButton
        idleSvg={MapNormal}
        activeSvg={MapFilled}
        href="/map"
        label="MAP"
      />
      <NavBarButton
        idleSvg={ListNormal}
        activeSvg={ListFilled}
        href="/list"
        label="LIST"
      />
      <NavBarButton
        idleSvg={ProfileNormal}
        activeSvg={ProfileFilled}
        href="/profile"
        label="PROFILE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: msc(8),
    justifyContent: "space-evenly",
    backgroundColor: "black",
    alignItems: "baseline",
  },
});
