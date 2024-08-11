import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { Tables } from "../../../types/supabase";
import { supabase } from "../../../utils/supabase";
import { AddressCard } from "./AddressCard";
import { ms } from "react-native-size-matters";
import {
  FilterController,
  AddressQueryParams,
} from "../../../components/FilterController";

export default function Page() {
  const params = useGlobalSearchParams<Partial<AddressQueryParams>>();
  console.log(params.zipCode);
  const [addresses, setAddresses] = useState<Tables<"EventAddress">[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [blockIds, setBlockIds] = useState<string[]>([]);

  useEffect(() => {
    const func = async () => {
      const res = await supabase.from("EventAddress").select("*");
      if (res.error) {
        console.log(res.error);
        Alert.alert("Failed to fetch addresses", res.error.message);
        return;
      }
      console.log(res.data);
      setAddresses(res.data);
      setZipCodes(
        Array.from(new Set(res.data.map((address) => address.zipCode))),
      );
      setBlockIds(
        Array.from(new Set(res.data.map((address) => address.blockId))),
      );
    };
    func();
  }, []);

  return (
    <View style={styles.container}>
      <FilterController
        filters={["status", "zipCode", "blockId"]}
        zipCodes={zipCodes}
        blockIds={blockIds}
      />
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={styles.addressList}
      >
        {addresses
          .filter((a) => {
            if (params.zipCode && a.zipCode != params.zipCode) return false;
            if (
              params.claimed &&
              ((!a.claimerId && params.claimed == "true") ||
                (a.claimerId && params.claimed == "false"))
            )
              return false;
            if (params.blockId && a.blockId != params.blockId) return false;
            return true;
          })
          .map((a) => (
            <AddressCard address={a} key={a.id} />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addressList: {
    width: "85%",
    gap: ms(10),
    alignSelf: "center",
  },
});
