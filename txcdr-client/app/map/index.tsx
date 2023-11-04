import { Link } from "expo-router";
import { Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Region } from "react-native-maps";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [zipCode, setZipCode] = useState("77005");

  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`,
      )
      .then((res) => {
        const { lat, lng }: { lat: number; lng: number } =
          res.data.results[0].geometry.location;
        console.log(lat, lng);
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      });
  }, [zipCode]);

  const onInputChange = (code: string) => {
    if (code.length == 5 && /^[0-9]+$/.test(code)) {
      setZipCode(code);
    }
  };

  return (
    <SafeAreaView>
      <Text className="text-2xl">Map page</Text>
      <Link href="/">Go back to home page</Link>
      <TextInput
        placeholder="Enter a ZIP code"
        keyboardType="numbers-and-punctuation"
        className="w-1/2 mx-auto bg-gray-300 rounded-full px-5 py-2"
        onChangeText={(e) => onInputChange(e)}
      />
      <MapView className="w-full h-full" region={region} />
    </SafeAreaView>
  );
}
