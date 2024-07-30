import { Tables } from "../../../types/supabase";

export interface PageProps {
  event: Tables<"Event">;
  eventCreator?: Pick<Tables<"User2">, "id" | "name" | "email" | "phone">;
  numVolunteers?: number;
  numAddresses?: number;
  numSurveyed?: number;
}
