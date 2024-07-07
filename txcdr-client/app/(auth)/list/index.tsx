import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View, Text, Pressable, ScrollView } from "react-native";

/**
 * List page
 * @returns List page component
 */
export default function Page() {
  const [zipCode, setZipCode] = useState("77005");

  const onInputChange = (code: string) => {
    if (code.length == 5 && /^[0-9]+$/.test(code)) {
      setZipCode(code);
    }
  };
  return (
    <ScrollView className="px-8 py-6">
      <TextInput
        placeholder="Enter a ZIP code"
        inputMode="numeric"
        style={{
          width: "100%",
          backgroundColor: "white",
          borderWidth: 2,
          borderRadius: 8,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          fontWeight: "600",
          textAlignVertical: "center", // Add this line
        }}
        onChangeText={(e) => onInputChange(e)}
        returnKeyType="done"
        defaultValue={zipCode}
        multiline={false}
      />
      <View className="top-3">
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl text-blue-600 font-semibold">
            Addresses
          </Text>
          <Pressable className="bg-blue-500 px-4 py-2 my-2 self-start flex flex-row rounded-full">
            <Ionicons name="chevron-down" color="white" size={18}></Ionicons>
            <Text className="pl-1 text-white text-center self-center text-sm">
              Show
            </Text>
          </Pressable>
        </View>
        <View className="flex flex-col gap-y-2">
          <Pressable
            className="flex flex-row border-2 border-blue-400 rounded-lg p-4 items-center"
            onPress={() => router.push("/list/1")}
          >
            <Ionicons name="home-outline" color="black" size={32}></Ionicons>
            <Text className="pl-4 font-medium text-lg">1111 Address Dr.</Text>
            <View className="ml-auto flex flex-row items-center">
              <AntDesign name="checkcircle" color="green" size={28}></AntDesign>
              <Ionicons
                name="chevron-forward"
                color="gray"
                size={24}
              ></Ionicons>
            </View>
          </Pressable>
          <View className="flex flex-row border-2 border-blue-400 rounded-lg p-4 items-center">
            <Ionicons name="home-outline" color="black" size={32}></Ionicons>
            <Text className="pl-4 font-medium text-lg">1111 Address Dr.</Text>
            <View className="ml-auto flex flex-row items-center">
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                color="black"
                size={32}
              ></MaterialCommunityIcons>
              <Ionicons
                name="chevron-forward"
                color="gray"
                size={24}
              ></Ionicons>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
