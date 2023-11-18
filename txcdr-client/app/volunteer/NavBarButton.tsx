import { Link, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ISvgProps } from "../../types/utils";

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
    <Pressable className="p-5" hitSlop={20}>
      <Link href={props.href}>
        <View className="flex-col justify-center items-center gap-1">
          <View className="w-9 h-9 items-center justify-center">
            {props.href == currPath ? <props.activeSvg /> : <props.idleSvg />}
          </View>
          <Text>{props.label}</Text>
        </View>
      </Link>
    </Pressable>
  );
}
