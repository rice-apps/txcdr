import { StyleSheet, View, ViewProps } from "react-native";
import { DText } from "../../../components/styled-rn/DText";

interface Props extends ViewProps {
  approved: boolean;
}

export function ApprovalCard(props: Props) {
  const { approved, style, ...viewProps } = props;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: approved ? "#22C55E" : "#F59E0B" },
        style,
      ]}
      {...viewProps}
    >
      <DText style={styles.text}>
        {approved ? "Registered" : "Pending approval"}
      </DText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "bold",
    padding: 6,
    fontSize: 12,
  },
});
