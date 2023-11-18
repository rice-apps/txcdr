import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ISvgProps } from "../../types/utils";

interface Props {
  svg: React.FC<ISvgProps>;
  label: string;
  href: string;
}

export function NavBarButton(props: Props) {
  return (
    <Pressable className="p-5" hitSlop={20}>
      <Link href={props.href}>
        <View className="flex-col justify-center items-center gap-1">
          <props.svg />
          <Text>{props.label}</Text>
        </View>
      </Link>
    </Pressable>
  );
}
