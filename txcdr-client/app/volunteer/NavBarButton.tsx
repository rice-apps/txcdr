import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props {
  label: string; // TODO: replace with svg field
  href: string;
}

export function NavBarButton(props: Props) {
  return (
    <Pressable className="py-5" hitSlop={20}>
      <Link href={props.href}>
        <View className="flex-col justify-center items-center">
          <Text>ICON</Text>
          <Text>{props.label}</Text>
        </View>
      </Link>
    </Pressable>
  );
}
