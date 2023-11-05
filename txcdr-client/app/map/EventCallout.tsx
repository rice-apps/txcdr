import { SafeAreaView, Text } from "react-native";
import { Callout } from "react-native-maps";
import { EventMarker } from "../../types/types";

interface Props {
  eventData: EventMarker;
}

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
