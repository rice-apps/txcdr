import { StyleSheet, View } from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { Zinc } from "../../../utils/styles/colors";
import { ReactNode } from "react";
import { ms } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";

export interface Filter {
  name: string;
  modal?: boolean;
  icon?: ReactNode;
}

interface Props {
  filter: Filter;
}

export function FilterButton({ filter }: Props) {
  return (
    <View style={styles.container}>
      {filter.icon}
      <DText style={styles.text}>{filter.name}</DText>
      {filter.modal && (
        <MaterialIcons
          name="keyboard-arrow-down"
          size={ms(20)}
          color={Zinc[800]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Zinc[200],
    paddingVertical: ms(5),
    paddingHorizontal: ms(12),
    borderRadius: 100,
    flexDirection: "row",
    gap: ms(5),
    alignItems: "center",
  },
  text: {
    color: Zinc[800],
    fontWeight: "600",
  },
});
