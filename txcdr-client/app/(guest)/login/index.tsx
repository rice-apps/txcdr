import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSession } from "../../../auth/ctx";

/**
 * Login page
 * @returns Login page component
 */
export default function Page() {
  const { signIn } = useSession();

  return (
    <View>
      <Text className="text-2xl">Login page</Text>
      <Pressable
        className="px-4 py-2 bg-slate-400"
        onPress={() => {
          signIn();
          router.replace("/dashboard");
        }}
      >
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
}
