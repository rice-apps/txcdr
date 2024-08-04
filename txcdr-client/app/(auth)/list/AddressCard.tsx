import { StyleSheet, View } from "react-native";
import { Tables } from "../../../types/supabase";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { DText } from "../../../components/styled-rn/DText";
import { ms } from "react-native-size-matters";
import { Blue, Zinc } from "../../../utils/styles/colors";

interface Props {
  address: Tables<"EventAddress">;
}

function abbreviateStreetType(type: string) {
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

export function AddressCard({ address }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Octicons name="home" color="gray" size={32}></Octicons>
        <DText style={styles.text}>{`${address.number} ${
          address.street
        } ${abbreviateStreetType(address.type)}`}</DText>
      </View>
      <View style={styles.right}>
        {address.claimerId ? (
          <AntDesign name="checkcircle" color="green" size={circleSize} />
        ) : (
          <View style={styles.unclaimedCircle} />
        )}
        <MaterialIcons
          name="arrow-forward-ios"
          size={ms(20)}
          color={Zinc[700]}
        />
      </View>
    </View>
  );
}

const outlineColor = Blue[600];
const circleSize = ms(20);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ms(10),
    borderRadius: ms(10),
    borderWidth: 2,
    borderColor: outlineColor,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(20),
  },
  text: {
    fontSize: ms(16),
    fontWeight: "500",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: ms(5),
  },
  unclaimedCircle: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: outlineColor,
    width: circleSize,
    height: circleSize,
  },
  claimedCircle: {},
  userClaimedCircle: {},
});
