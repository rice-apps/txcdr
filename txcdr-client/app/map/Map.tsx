import axios from "axios";
import { useState, useEffect } from "react";
import { SafeAreaView, TextInput } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";
import { EventMarker } from "../../types/types";
import { EventCallout } from "./EventCallout";

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
    <SafeAreaView>
      <MapView className="w-full h-full" region={region}>
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.latlng}>
            <EventCallout eventData={marker} />
          </Marker>
        ))}
      </MapView>
      <SafeAreaView className="w-full top-7 absolute mx-auto flex items-center justify-center">
        <TextInput
          placeholder="Enter a ZIP code"
          inputMode="numeric"
          className="w-1/2 bg-gray-200 rounded-full py-2 mx-auto shadow-sm shadow-gray-600 text-lg text-center items-center text-gray-500 "
          onChangeText={(e) => onInputChange(e)}
          returnKeyType="done"
          defaultValue={zipCode}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}
