import { FunctionComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
export function SafeAreaFlex(props: CustomSafeAreaViewProps) {
  const { children, style, ...rest } = props;
  return (
    <SafeAreaView style={[styles.view, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

interface CustomSafeAreaViewProps extends SafeAreaViewProps {
  disableBottomSafeArea?: boolean;
  disableTopSafeArea?: boolean;
  disableSidesSafeArea?: boolean;
  children: React.ReactNode;
}

export const SafeAreaView: FunctionComponent<CustomSafeAreaViewProps> = (
  props: CustomSafeAreaViewProps,
) => {
  const {
    disableBottomSafeArea = false,
    disableTopSafeArea = false,
    disableSidesSafeArea = false,
    style,
    children,
  } = props;

  const insets = useSafeAreaInsets();

  const margins: ViewStyle = {};

  if (!disableBottomSafeArea) {
    margins.marginBottom = insets.bottom;
  }

  if (!disableTopSafeArea) {
    margins.marginTop = insets.top;
  }

  if (!disableSidesSafeArea) {
    margins.marginRight = insets.right;
    margins.marginLeft = insets.left;
  }

  return <View style={[margins, style]}>{children}</View>;
};
