import { Pressable, Text, View } from "react-native";
import { supabase } from "../../utils/supabase";

/**
 * The volunteer profile page
 * @returns Profile page component
 */
export default function Page() {
  return (
    <View>
      <Text>Profile page</Text>
      <Pressable
        className="px-4 py-2 bg-slate-400"
        onPress={() => {
          supabase.auth.signOut();
        }}
      >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
