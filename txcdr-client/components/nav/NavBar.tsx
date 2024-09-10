import { StyleSheet, View } from "react-native";
import { NavBarButton } from "./NavBarButton";
import {
  HomeNormal,
  HomeFilled,
  MapNormal,
  MapFilled,
  ListNormal,
  ListFilled,
  SettingsNormal,
  SettingsFilled,
} from "../../assets/svgs/NavBarIcons";
import { ms } from "react-native-size-matters";

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
        idleSvg={SettingsNormal}
        activeSvg={SettingsFilled}
        href="/settings"
        label="SETTINGS"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: ms(8),
    justifyContent: "space-evenly",
    backgroundColor: "black",
    alignItems: "baseline",
  },
});
