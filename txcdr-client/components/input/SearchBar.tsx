import { MaterialIcons } from "@expo/vector-icons";
import { View, TextInput, ViewProps } from "react-native";
import { ms } from "react-native-size-matters";
import { Zinc } from "../../utils/styles/colors";
import { StyleSheet } from "react-native";

export interface SearchBarProps extends ViewProps {
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export function SearchBar(props: SearchBarProps) {
  const { style, onChangeText, ...rest } = props;
  return (
    <View style={[styles.searchContainer, style]} {...rest}>
      <MaterialIcons name="search" size={24} color={Zinc[400]} />
      <TextInput
        placeholder={props.placeholder ?? "Search"}
        hitSlop={20}
        style={styles.searchInput}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
