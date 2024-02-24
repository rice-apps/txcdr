import { Pressable, Text, View } from "react-native";
import { useSession } from "../../../auth/ctx";
import { router } from "expo-router";

/**
 * The volunteer profile page
 * @returns Profile page component
 */
export default function Page() {
  const { signOut, session } = useSession();
  return (
    <View>
      <Text>Profile page</Text>
      <Pressable
        className="px-4 py-2 bg-slate-400"
        onPress={() => {
          signOut();
          router.replace("/");
        }}
      >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
