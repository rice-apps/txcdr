import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Tables } from "../../../types/supabase";
import { supabase } from "../../../utils/supabase";
import { AddressCard } from "./AddressCard";
import { ms } from "react-native-size-matters";
import {
  FilterController,
  AddressQueryParams,
} from "../../../components/FilterController";
import { SearchBar } from "../../../components/input/SearchBar";
import { addressToShortString } from "../../../utils/address-utils";
import { useUser } from "../../../utils/hooks/useUser";
import { useRole } from "../../../utils/hooks/useRole";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DText } from "../../../components/styled-rn/DText";
import { useFilterController } from "../../../utils/hooks/useFilterController";

export default function Page() {
  const { addresses, controller, params } = useFilterController([
    "blockId",
    "event",
    "status",
    "zipCode",
  ]);
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={setSearch}
        placeholder="Search for addresses..."
        style={{ width: "85%", alignSelf: "center" }}
      />
      {controller}
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={styles.addressList}
      >
        {addresses != undefined ? (
          addresses.length > 0 ? (
            addresses
              .filter((a) => {
                if (params.zipCode && a.zipCode != params.zipCode) return false;
                if (
                  params.claimed &&
                  ((!a.claimerId && params.claimed == "true") ||
                    (a.claimerId && params.claimed == "false"))
                )
                  return false;
                if (params.blockId && a.blockId != params.blockId) return false;
                if (
                  search &&
                  !addressToShortString(a)
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                  return false;
                if (params.eventId && a.eventId != +params.eventId)
                  return false;
                return true;
              })
              .map((a) => <AddressCard address={a} key={a.id} />)
          ) : (
            <DText>No addresses found</DText>
          )
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(15),
  },

  addressList: {
    width: "85%",
    gap: ms(10),
    alignSelf: "center",
  },
});
