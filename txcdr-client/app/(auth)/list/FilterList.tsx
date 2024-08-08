import { View, ScrollView, StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";
import { DText } from "../../../components/styled-rn/DText";
import { AddressCard } from "./AddressCard";
import { Filter, FilterButton } from "./FilterButton";

interface Props {
  filters: Filter[];
}

export function FilterList(props: Props) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.filterList}>
      {props.filters.map((f) => (
        <FilterButton filter={f} key={f.name} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterList: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    gap: ms(10),
  },
});
