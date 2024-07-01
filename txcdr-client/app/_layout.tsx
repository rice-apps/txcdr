import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "../auth/ctx";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/client";

/**
 * Layout for all of the pages in the app
 * @returns Page component with layout layer
 */
export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <View style={styles.base}>
          <Slot />
        </View>
      </AuthProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  base: {
    height: "100%",
    flex: 1,
  },
});
