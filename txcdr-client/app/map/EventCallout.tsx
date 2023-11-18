import { SafeAreaView, Text } from "react-native";
import { Callout } from "react-native-maps";
import { EventMarker } from "../../types/types";

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
    <Callout className="w-[300px] h-[100px] flex-1 relative">
      <SafeAreaView>
        <Text className="text-lg font-bold">{eventData.title}</Text>
        <Text className="">{eventData.description}</Text>
      </SafeAreaView>
    </Callout>
  );
}
