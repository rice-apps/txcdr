import { Link, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ISvgProps } from "../../types/utils";

interface Props {
  href: string;
  idleSvg: React.FC<ISvgProps>;
  activeSvg: React.FC<ISvgProps>;
  label: string;
}

export function NavBarButton(props: Props) {
  const currPath = usePathname();
  return (
    <Pressable className="p-5" hitSlop={20}>
      <Link href={props.href}>
        <View className="flex-col justify-center items-center gap-1">
          <View className="w-9 h-9 items-center">
            {props.href == currPath ? <props.activeSvg /> : <props.idleSvg />}
          </View>
          <Text>{props.label}</Text>
        </View>
      </Link>
    </Pressable>
  );
}
