import { QueryData } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { Tables } from "./supabase";

export interface EventDetails {
  id: number;
  eventName: string;
  numVolunteers: number;
  numSurveyed: number;
  numAddresses: number;
  severity: "Low" | "Moderate" | "Severe";
  description: string;
  contactName: string;
  registered: boolean;
}

export type Address = Omit<Tables<"Address">, "id" | "createdAt" | "updatedAt">;

const query = supabase.from("EventAddress").select("*, Address(*)").single();
export type FullAddress = QueryData<typeof query>;
