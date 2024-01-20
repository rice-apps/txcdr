import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";
import { useSession } from "../../../auth/ctx";

/**
 * Login page
 * @returns Login page component
 */
export default function Page() {
  const { session, signIn } = useSession();
  console.log(session);
  return (
    <View>
      <Text className="text-2xl">Login page</Text>
      <Button
        title="Sign in"
        onPress={() => {
          signIn();
          router.replace("/");
        }}
      />
    </View>
  );
}
