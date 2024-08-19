import { useLocalSearchParams, useRouter } from "expo-router";
import EventForm from "../../EventForm";

export default function Page() {
  const eventId = useLocalSearchParams().eventId as string;
  return <EventForm eventId={eventId}></EventForm>;
}
