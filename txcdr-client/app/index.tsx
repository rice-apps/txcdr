import { router, useRootNavigation, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "react-native";

/**
 * App home page that is unprotected by auth
 * @returns App home page
 */
export default function Page() {
  // Assume user is authenticated
  const rootNav = useRootNavigationState();
  useEffect(() => {
    if (rootNav.key) {
      console.log("assuming user is authenticated, rerouting to home page..");
      router.replace("/dashboard");
    }
  }, [rootNav.key]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
