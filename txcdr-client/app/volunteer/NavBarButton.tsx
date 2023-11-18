import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props {
  svg: React.FC<any>;
  label: string;
  href: string;
}

export function NavBarButton(props: Props) {
  return (
    <Pressable className="p-5" hitSlop={20}>
      <Link href={props.href}>
        <View className="flex-col justify-center items-center">
          <props.svg />
          <Text>{props.label}</Text>
        </View>
      </Link>
    </Pressable>
  );
}
