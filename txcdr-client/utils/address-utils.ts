import { Tables } from "../types/supabase";

export function abbreviateStreetType(type: string) {
  switch (type.toLowerCase()) {
    case "street":
      return "St.";
    case "avenue":
      return "Ave.";
    case "boulevard":
      return "Blvd.";
    case "drive":
      return "Dr.";
    case "court":
      return "Ct.";
    case "circle":
      return "Cir.";
    case "lane":
      return "Ln.";
    case "road":
      return "Rd.";
    case "parkway":
      return "Pkwy.";
    case "highway":
      return "Hwy.";
    default:
      return type;
  }
}

export function addressToShortString(address: Tables<"EventAddress">) {
  return `${address.number} ${address.street} ${abbreviateStreetType(
    address.type,
  )}`;
}

export function addressToLongString(address: Tables<"EventAddress">) {
  return `${address.number} ${address.street} ${address.type} ${address.city}, ${address.state} ${address.zipCode}`;
}
