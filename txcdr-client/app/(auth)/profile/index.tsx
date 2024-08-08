import {
  Pressable,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSession } from "../../../auth/ctx";
import { supabase } from "../../../utils/supabase";
import { useEffect, useState } from "react";
import { Tables } from "../../../types/supabase";
import { Icon } from "@rneui/themed/dist/Icon";
import { router } from "expo-router";

/**
 * The volunteer profile page
 * @returns Profile page component
 */
export default function Page() {
  const { signOut, session } = useSession();
  const [user, setUser] = useState<Tables<"User2"> | null>(null);
  // Get the user's profile data using useEffect from supabase
  useEffect(() => {
    // get our own id
    supabase.auth.getUser().then((res) => {
      // we should definitely be logged in
      let id = res.data.user!.id;

      supabase
        .from("User2")
        .select()
        .eq("id", id)
        .then((res) => {
          setUser(res.data![0]);
        });
    });
  });
  return (
    <ScrollView
      contentContainerStyle={
        !user ? { flexGrow: 1, justifyContent: "center" } : {}
      }
    >
      {!user && (
        <View className="self-center justify-self-center">
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      )}
      {user && (
        <View className="flex flex-col px-10 py-5 justify-center align-middle gap-y-6">
          {/* Profile page */}
          <View className="flex flex-row justify-start gap-x-5">
            <Image
              height={50}
              width={50}
              className="rounded-full"
              source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            />
            <Text className="self-center text-2xl mr-auto">{user.name}</Text>
            <Icon
              name={"edit"}
              size={20}
              hitSlop={30}
              style={{ alignSelf: "center", marginVertical: "auto" }}
              onPress={() => {
                router.push("/profile/edit");
              }}
            ></Icon>
          </View>
          {/* Loading spinner if user is not loaded */}
          {/* Display user data */}
          {
            <View className="gap-y-4">
              <View className="drop-shadow-2xl">
                <View className="bg-blue-500 py-4 px-8 rounded-t-3xl drop-shadow-2xl">
                  <Text className="text-white text-xl">
                    Contact Information
                  </Text>
                </View>
                <View className="bg-slate-300 px-10 pt-6 pb-8 rounded-b-3xl drop-shadow-2xl">
                  {/* Phone */}
                  <View className="flex flex-col gap-y-2">
                    <Text className="text-xs uppercase font-medium">Phone</Text>
                    <Text className="text-base">{user.phone}</Text>
                  </View>
                  {/* Email */}
                  <View className="flex flex-col gap-y-2">
                    <Text className="text-xs uppercase font-medium">Email</Text>
                    <Text className="text-base">{user.email}</Text>
                  </View>
                </View>
              </View>
              <View className="drop-shadow-2xl">
                <View className="bg-blue-500 py-4 px-8 rounded-t-3xl drop-shadow-2xl">
                  <Text className="text-white text-xl">
                    Demographic Information
                  </Text>
                </View>
                <View className="bg-slate-300 px-10 pt-6 pb-8 rounded-b-3xl drop-shadow-2xl">
                  <View className="flex flex-col w-full gap-y-4">
                    {/* Phone */}
                    <View className="flex flex-row gap-x-10 items-center">
                      <Text className="text-xs uppercase w-25 mr-auto font-medium">
                        Pronouns
                      </Text>
                      <Text className="text-base">{user.pronouns}</Text>
                    </View>
                    {/* Email */}
                    <View className="flex flex-row gap-x-10 items-center">
                      <Text className="text-xs uppercase mr-auto font-medium">
                        Age
                      </Text>
                      <Text className="text-base">{user.age}</Text>
                    </View>
                    {/* Email */}
                    <View className="flex flex-row gap-x-10 items-center">
                      <Text className="text-xs uppercase mr-auto font-medium">
                        Languages
                      </Text>
                      <Text className="text-base">{user.languages}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="drop-shadow-2xl">
                <View className="bg-blue-500 py-4 px-8 rounded-t-3xl drop-shadow-2xl">
                  <Text className="text-white text-xl">Organizations</Text>
                </View>
                <View className="bg-slate-300 px-10 pt-6 pb-8 rounded-b-3xl drop-shadow-2xl">
                  {/* Phone */}
                  <Text className="text-base">{user.organizations}</Text>
                </View>
              </View>
            </View>
          }
        </View>
      )}
    </ScrollView>
  );
}
