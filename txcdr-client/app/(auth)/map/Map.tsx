import axios from "axios";
import { useState, useEffect } from "react";
import { TextInput, Text, Pressable } from "react-native";
import { View } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";
import { EventMarker } from "../../../types/map";
import { EventCallout } from "./EventCallout";
import { Ionicons } from "@expo/vector-icons";

/**
 * MapView component with ZIP code searching, markers, and callouts
 * @returns MapView component
 */
export function Map() {
  // Keep track of selected region (based on ZIP code state)
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  // Keep track of ZIP code input
  const [zipCode, setZipCode] = useState("77005");

  // Update the selected region when ZIP code state is changed
  useEffect(() => {
    // Use Google Maps Geocoding API (https://developers.google.com/maps/documentation/geocoding/overview)
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`,
      )
      .then((res) => {
        const { lat, lng }: { lat: number; lng: number } =
          res.data.results[0].geometry.location;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      })
      .catch(() => console.log("Invalid ZIP code provided"));
  }, [zipCode]);

  // ZIP code text input handler
  const onInputChange = (code: string) => {
    if (code.length == 5 && /^[0-9]+$/.test(code)) {
      setZipCode(code);
    }
  };

  // Hard-coded markers (TODO: replace with actual data)
  const markers: EventMarker[] = [
    {
      latlng: {
        latitude: 29.717154,
        longitude: -95.404182,
      },
      title: "Rice University",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <View className="h-full">
      <MapView
        className="w-full h-full"
        region={region}
        showsBuildings={false}
        showsPointsOfInterest={false}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng}>
            <EventCallout eventData={marker} />
          </Marker>
        ))}
      </MapView>
      <View className="w-full top-7 absolute mx-auto px-8">
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
        <Pressable className="bg-blue-500 px-3 py-2 my-2 self-start flex flex-row rounded-full">
          <Ionicons name="add" color="white" size={18}></Ionicons>
          <Text className="pl-1 text-white text-center self-center">
            Filter
          </Text>
        </Pressable>
      </View>
      <View className="absolute bottom-0 p-5 right-2">
        <Pressable className="bg-blue-500 px-4 py-2 my-2 self-start flex flex-row rounded-full">
          <Ionicons name="chevron-up" color="white" size={18}></Ionicons>
          <Text className="pl-1 text-white text-center self-center text-sm">
            View address list
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
