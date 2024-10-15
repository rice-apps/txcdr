import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";
import { useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  AddressQueryParams,
  Filter,
  FilterController,
} from "../../components/FilterController";
import { Tables } from "../../types/supabase";
import { supabase } from "../supabase";
import { useRole } from "./useRole";
import { useUser } from "./useUser";

const addressQuery = supabase.from("EventAddress").select("*, Address(*)");
type AddressData = QueryData<typeof addressQuery>;

export function useFilterController(filters: Filter[]) {
  const params = useGlobalSearchParams<Partial<AddressQueryParams>>();
  const [addresses, setAddresses] = useState<AddressData>();
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [blockIds, setBlockIds] = useState<string[]>([]);
  const [eventIds, setEventIds] = useState<number[]>([]);
  const user = useUser();
  const [role] = useRole();
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>();

  // Load events the user is registered for
  useEffect(() => {
    const func = async () => {
      if (user && role == "USER") {
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
      const res = await (role != "USER"
        ? addressQuery
        : addressQuery.in("eventId", registeredEventIds!));
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
          if (!a.Address) continue;
          zipCodes.add(a.Address.zipCode);
          blockIds.add(a.Address.blockId);
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
      (role == "USER" ? registeredEventIds != undefined : true)
    )
      func();
  }, [role, user, registeredEventIds, addresses]);

  return {
    controller: (
      <FilterController
        filters={filters}
        zipCodes={zipCodes}
        blockIds={blockIds}
        eventIds={eventIds.map((id) => id.toString())}
      />
    ),
    params: params,
    addresses: addresses,
  };
}
