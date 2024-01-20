import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../auth/ctx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

/**
 * Layout for all of the pages in the app
 * @returns Page component with layout layer
 */
export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SafeAreaView className="flex-1 bg-gray-100" edges={["top"]}>
          <Slot />
        </SafeAreaView>
      </AuthProvider>
    </ApolloProvider>
  );
}
