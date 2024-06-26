import { Link, router } from "expo-router";
import { Pressable, Text, TextInput } from "react-native";
import { useSession } from "../../../auth/ctx";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * Login page
 * @returns Login page component
 */
export default function Page() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView>
      <Text className="text-2xl">Login</Text>
      <TextInput placeholder="Email" onChangeText={(s) => setEmail(s)} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(s) => setPassword(s)}
      />
      <Pressable
        className="px-4 py-2 bg-slate-400"
        onPress={() => {
          signIn({ input: { email, password } }).then((res) => {
            router.replace("/dashboard");
          });
        }}
      >
        <Text>Sign in</Text>
      </Pressable>
      <Link href={"/signup"}>Don't have an account?</Link>
    </SafeAreaView>
  );
}
