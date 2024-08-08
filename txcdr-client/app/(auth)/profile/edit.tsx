import { View, Text, ScrollView, TextInput, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { supabase } from "../../../utils/supabase";
import { Tables } from "../../../types/supabase";

// Edit page form for user profile, where users can update their information
export default function Page() {
  const [user, setUser] = useState<Tables<"User2"> | null>(null);
  const { control, handleSubmit, formState, getValues } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: user?.name,
        pronouns: user?.pronouns,
        age: user?.age,
        languages: user?.languages,
        organizations: user?.organizations,
      };
    }, [user]),
  });

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
  const [image, setImage] = useState<string | null>(null);

  const onCameraSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage('./assets/hydrangea.png');
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="p-8 flex flex-col">
      <View>
        <Text className="text-3xl font-semibold">Edit Profile</Text>
      </View>
      <View className="flex flex-col pt-5 justify-center align-middle self-center">
        <Image
          height={75}
          width={75}
          className="rounded-full"
          source={{ uri: image || "https://reactnative.dev/img/tiny_logo.png" }}
        />
        <Pressable className="pt-3" onPress={onCameraSelect}>
          <Text className="text-center text-lg text-blue-500 font-medium">
            Edit
          </Text>
        </Pressable>
      </View>
      {/* Form Sections */}
      <View className="flex flex-col pt-5 pb-6">
        <Text className="text-blue-600 text-2xl font-semibold pb-2">
          Personal Information
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="pb-4">
              <Text className="text-xl pb-2 font-medium">Name</Text>
              <TextInput
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ?? ""}
                className="border border-gray-300 rounded-3xl p-4 w-full"
              />
            </View>
          )}
          name="name"
        />
      </View>
      <View className="flex flex-col pt-5 pb-6">
        <Text className="text-blue-600 text-2xl font-semibold pb-2">
          Demographic Information
        </Text>
        <View className="flex flex-row">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-1">
                <Text className="text-xl pb-2 font-medium">Pronouns</Text>
                <TextInput
                  placeholder="Pronouns"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border border-gray-300 rounded-3xl p-4 w-full"
                />
              </View>
            )}
            name="pronouns"
          />
          <View className="px-6"></View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex-1">
                <Text className="text-xl pb-2 font-medium">Age</Text>
                <TextInput
                  numberOfLines={1}
                  placeholder="Age"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border border-gray-300 rounded-3xl p-4 w-full"
                  keyboardType="numeric"
                />
              </View>
            )}
            name="age"
          />
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="pt-4">
              <Text className="text-xl pb-2 font-medium">Languages Spoken</Text>
              <TextInput
                placeholder="Languages Spoken"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
                className="border border-gray-300 rounded-3xl p-4 w-full h-32"
              />
            </View>
          )}
          name="languages"
        />
      </View>
      <View className="flex flex-col pt-5 pb-6">
        <Text className="text-blue-600 text-2xl font-semibold pb-2">
          Organizations
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
                className="border border-gray-300 rounded-3xl p-4 w-full h-32"
              />
            </>
          )}
          name="organizations"
        />
      </View>
      <View className="flex flex-row gap-x-12">
        <Pressable
          className="rounded-3xl py-4 border-2 border-gray-400 flex-1"
          onPress={() => router.back()}
        >
          <Text className="text-center text-lg font-semibold">Cancel</Text>
        </Pressable>
        <Pressable
          className="bg-blue-500 rounded-3xl py-4 flex-1"
          onPress={() => {
            router.back();
            // submit to supabase for our user id
            supabase.auth.getUser().then((res) => {
              // we should definitely be logged in
              let id = res.data.user!.id;

              supabase
                .from("User2")
                .update({
                  name: getValues("name"),
                  pronouns: getValues("pronouns"),
                  age: getValues("age"),
                  languages: getValues("languages"),
                  organizations: getValues("organizations"),
                })
                .eq("id", id)
                .then((res) => {
                  console.log(user);
                  console.log(id);
                  console.log(res);
                });
            });
          }}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Save Changes
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
