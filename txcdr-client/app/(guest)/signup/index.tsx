import { Link, router } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";
import { useSession } from "../../../auth/ctx";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

/**
 * Sign up page
 * @returns Sign up page component
 */
export default function Page() {
  const { signIn, signUp } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: figure out if we need these fields on this page
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  const onSubmit = () => {
    signUp({ input: { email }, password })
      .then((res) => {
        console.log(res);
        signIn({ input: { email, password } })
          .then((res) => {
            console.log(res);
            router.replace("/dashboard");
          })
          .catch((e) => {
            console.log("login failed: " + e);
          });
      })
      .catch((e) => {
        console.log("failed " + e);
        Alert.alert("Error", "Sign up error", [
          {
            text: "Okay",
            style: "cancel",
          },
        ]);
      });
  };

  return (
    <SafeAreaView>
      <Text className="text-2xl">Sign up</Text>
      <TextInput placeholder="Email" onChangeText={(s) => setEmail(s)} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(s) => setPassword(s)}
      />
      <Pressable className="px-4 py-2 bg-slate-400" onPress={onSubmit}>
        <Text>Sign in</Text>
      </Pressable>
    </SafeAreaView>
  );
}
