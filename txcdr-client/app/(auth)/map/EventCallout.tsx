import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Callout } from "react-native-maps";
import { EventMarker } from "../../../types/map";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  eventData: EventMarker;
}

/**
 * Custom callout that displays a small event card on top of its annotation pin
 * @param param0 Event data
 * @returns React component
 */
export function EventCallout({ eventData }: Props) {
  return (
    <Callout className="w-[300px] flex-1 relative min-h-fit">
      <SafeAreaView className="flex">
        <Text className="text-lg font-bold">{eventData.title}</Text>
        <View className="self-start bg-orange-300 rounded-xl">
          <Text className="text-sm self-start px-2">{"Status"}</Text>
        </View>
        <View className="self-end flex flex-row items-center">
          <Text className="pl-1 text-gray-700">{"more"}</Text>
          <Ionicons name="chevron-forward"></Ionicons>
        </View>
      </SafeAreaView>
    </Callout>
  );
}
