import axios from "axios";
import { useState, useEffect } from "react";
import { TextInput, Text, Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";
import { EventMarker } from "../../../types/map";
import { EventCallout } from "./EventCallout";
import { Ionicons } from "@expo/vector-icons";
import {
  AddressQueryParams,
  FilterController,
} from "../../../components/FilterController";
import { useFilterController } from "../../../utils/hooks/useFilterController";
import { ms } from "react-native-size-matters";
import {
  addressToLongString,
  addressToShortString,
} from "../../../utils/address-utils";
import { Tables } from "../../../types/supabase";
import { FullAddress } from "../../../types/event";
import { supabase } from "../../../utils/supabase";

function passedFilter(
  address: FullAddress,
  search: string,
  params: Partial<Partial<AddressQueryParams>>,
) {
  if (params.zipCode && address.Address?.zipCode != params.zipCode)
    return false;
  if (
    params.claimed &&
    ((!address.claimerId && params.claimed == "true") ||
      (address.claimerId && params.claimed == "false"))
  )
    return false;
  if (params.blockId && address.Address?.blockId != params.blockId)
    return false;
  if (
    search &&
    address.Address &&
    !addressToShortString(address.Address)
      .toLowerCase()
      .includes(search.toLowerCase())
  )
    return false;
  if (params.eventId && address.eventId != +params.eventId) return false;
  return true;
}
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
  const [search, setSearch] = useState("");
  const [markers, setMarkers] = useState<EventMarker[]>([]);
  console.log("render");

  const { controller, params, addresses } = useFilterController([
    "blockId",
    "event",
    "status",
    "zipCode",
  ]);

  useEffect(() => {
    const func = async () => {
      if (addresses) {
        for (const a of addresses) {
          if (!passedFilter(a, search, params) || !a.Address) continue;
          let lat: number;
          let lng: number;
          if (!a.Address.lat || !a.Address.lng) {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                addressToLongString(a.Address),
              )}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`,
            );
            const data = await res.json();
            const coords: { lat: number; lng: number } =
              data.results[0].geometry.location;
            lat = coords.lat;
            lng = coords.lng;
            supabase
              .from("Address")
              .update({ lat, lng, updatedAt: null }) // let postgres handle the timestamp
              .eq("id", a.Address.id)
              .then();
          } else {
            lat = a.Address.lat;
            lng = a.Address.lng;
          }

          setMarkers((prev) => [
            ...prev,
            {
              latlng: {
                latitude: lat,
                longitude: lng,
              },
              title: addressToShortString(a.Address!), // Already checked for null
              description: addressToLongString(a.Address!),
            },
          ]);
        }
      }
    };
    func().catch((e) => console.error(e));
  }, [addresses, params]);

  // Update the selected region when ZIP code state is changed
  // useEffect(() => {
  //   // Use Google Maps Geocoding API (https://developers.google.com/maps/documentation/geocoding/overview)
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`,
  //     )
  //     .then((res) => {
  //       const { lat, lng }: { lat: number; lng: number } =
  //         res.data.results[0].geometry.location;
  //       setRegion({
  //         latitude: lat,
  //         longitude: lng,
  //         latitudeDelta: 0.1,
  //         longitudeDelta: 0.1,
  //       });
  //     })
  //     .catch(() => console.log("Invalid ZIP code provided"));
  // }, [zipCode]);

  // Hard-coded markers (TODO: replace with actual data)
  // const markers: EventMarker[] = [
  //   {
  //     latlng: {
  //       latitude: 29.717154,
  //       longitude: -95.404182,
  //     },
  //     title: "Rice University",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //   },
  // ];

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
      <View style={styles.topBar}>
        <TextInput
          placeholder="Enter a ZIP code"
          inputMode="numeric"
          style={{
            width: "90%",
            backgroundColor: "white",
            borderWidth: 2,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
            fontWeight: "600",
            textAlignVertical: "center",
          }}
          onChangeText={setSearch}
          returnKeyType="done"
          multiline={false}
        />
        {controller}
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

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    top: ms(28),
    position: "absolute",
    marginHorizontal: "auto",
    alignItems: "center",
    gap: ms(10),
  },
});
