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
import { addressToString } from "./helpers";
import { useUser } from "../../../utils/hooks/useUser";
import { useRole } from "../../../utils/hooks/useRole";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DText } from "../../../components/styled-rn/DText";

export default function Page() {
  const params = useGlobalSearchParams<Partial<AddressQueryParams>>();
  const [addresses, setAddresses] = useState<Tables<"EventAddress">[]>();
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [blockIds, setBlockIds] = useState<string[]>([]);
  const [eventIds, setEventIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const user = useUser();
  const [role] = useRole();
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>();

  // Load events the user is registered for
  useEffect(() => {
    const func = async () => {
      if (user && role != "USER") {
        const res = await supabase
          .from("EventVolunteer")
          .select("eventId")
          .eq("volunteerId", user.id)
          .eq("approved", true);
        if (res.error) {
          console.log(res.error);
          Alert.alert("Failed to fetch events", res.error.message);
          return;
        }
        setRegisteredEventIds(res.data.map((e) => e.eventId));
      }
    };

    func();
  }, [user, role]);

  // Load addresses
  useEffect(() => {
    const func = async () => {
      let res: PostgrestSingleResponse<Tables<"EventAddress">[]> | undefined;
      if (role != "USER") {
        // Admins can see all addresses
        res = await supabase.from("EventAddress").select("*");
      } else {
        // Users can see only the addresses of events they are registered for
        res = await supabase
          .from("EventAddress")
          .select("*")
          .in("eventId", registeredEventIds!);
      }
      if (res) {
        if (res.error) {
          console.log(res.error);
          Alert.alert("Failed to fetch addresses", res.error.message);
          return;
        }
        setAddresses(res.data);

        // Build data for the filters
        const zipCodes: Set<string> = new Set();
        const blockIds: Set<string> = new Set();
        const eventIds: Set<number> = new Set();
        for (const a of res.data) {
          zipCodes.add(a.zipCode);
          blockIds.add(a.blockId);
          eventIds.add(a.eventId);
        }
        setZipCodes(Array.from(zipCodes));
        setBlockIds(Array.from(blockIds));
        setEventIds(Array.from(eventIds));
      }
    };

    if (
      addresses == undefined &&
      user &&
      role &&
      registeredEventIds != undefined
    )
      func();
  }, [role, user, registeredEventIds, addresses]);

  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={setSearch}
        placeholder="Search for addresses..."
        style={{ width: "85%", alignSelf: "center" }}
      />
      <FilterController
        filters={["status", "zipCode", "blockId", "event"]}
        zipCodes={zipCodes}
        blockIds={blockIds}
        eventIds={eventIds.map((id) => id.toString())}
      />
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
                  !addressToString(a)
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
