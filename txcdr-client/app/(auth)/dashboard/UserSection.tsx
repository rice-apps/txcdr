import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { EventCard } from "./EventCard";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Zinc } from "../../../utils/styles/colors";
import { ms } from "react-native-size-matters";
import { SectionProps } from ".";
import { SearchBar } from "../../../components/input/SearchBar";
import { CommonStyles } from "./styles";

export function UserSection({ events }: SectionProps) {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchBar onChangeText={setQuery} placeholder="Search for events..." />
      {events ? (
        <ScrollView
          style={CommonStyles.scroller}
          contentContainerStyle={CommonStyles.eventList}
        >
          {events
            .filter(
              (event) => !query || event.title.toLowerCase().includes(query),
            )
            .map((e, i) => (
              <EventCard
                id={e.id}
                registered={e.approved}
                severity={e.severity}
                title={e.title}
                key={e.id}
              />
            ))}
        </ScrollView>
      ) : (
        <ActivityIndicator
          size="large"
          style={{
            justifyContent: "center",
            height: "100%",
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  searchContainer: {
    borderRadius: ms(15),
    borderColor: Zinc[400],
    borderWidth: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    gap: ms(10),
  },
  searchInput: { width: "100%" },

  footer: {
    // textAlign: "center",
    height: 60,
  },
});
