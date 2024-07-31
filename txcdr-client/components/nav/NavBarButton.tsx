import { Link, usePathname } from "expo-router";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { ISvgProps } from "../../types/utils";
import { ms } from "react-native-size-matters";

interface Props {
  /**
   * The page this button redirects the user to (e.g. "/map")
   */
  href: string;

  /**
   * The SVG component displayed when the current route is not `href`
   */
  idleSvg: React.FC<ISvgProps>;

  /**
   * The SVG component displayed when the current rout is `href`
   */
  activeSvg: React.FC<ISvgProps>;

  /**
   * The text displayed underneath the SVG
   */
  label: string;
}

/**
 * Bottom navigation bar component
 * @param props Customization options for the button
 * @returns Bottom navigation bar component
 */
export function NavBarButton(props: Props) {
  const currPath = usePathname();

  return (
    <Pressable style={styles.container} hitSlop={20}>
      <Link href={props.href}>
        <View style={styles.column}>
          {props.href == currPath ? (
            <props.activeSvg style={styles.icon as StyleProp<ViewStyle>} />
          ) : (
            <props.idleSvg style={styles.icon as StyleProp<ViewStyle>} />
          )}
          <Text style={styles.text}>{props.label}</Text>
        </View>
      </Link>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  column: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    gap: ms(2),
    padding: ms(20),
  },
  text: {
    paddingTop: ms(10),
    fontSize: ms(12),
    fontWeight: "semibold",
    textAlign: "center",
    color: "#fff",
  },
  icon: {
    color: "#fff",
  },
});
