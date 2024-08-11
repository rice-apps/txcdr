import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/client";
import { SafeAreaProvider } from "react-native-safe-area-context";

/**
 * Layout for all of the pages in the app
 * @returns Page component with layout layer
 */
export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <View style={styles.base}>
          <Slot />
        </View>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  base: {
    height: "100%",
    flex: 1,
  },
});
