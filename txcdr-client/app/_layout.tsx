import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
          <Slot />
        </SafeAreaView>
      </AuthProvider>
    </ApolloProvider>
  );
}
