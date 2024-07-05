import { Link, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ISvgProps } from "../../types/utils";
import { msc } from "../../utils/size-matters-aliases";

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
            <props.activeSvg style={styles.icon} />
          ) : (
            <props.idleSvg style={styles.icon} />
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
    gap: msc(2),
    padding: msc(20),
  },
  text: {
    paddingTop: msc(10),
    fontSize: msc(12),
    fontWeight: "medium",
    textAlign: "center",
    color: "#fff",
  },
  icon: {
    color: "#fff",
  },
});
