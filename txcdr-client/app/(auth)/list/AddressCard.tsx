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
import { OpacityPressable } from "../../../components/styled-rn/OpacityPressable";
import { router } from "expo-router";
import {
  abbreviateStreetType,
  addressToShortString,
} from "../../../utils/address-utils";
import { QueryData } from "@supabase/supabase-js";
import { supabase } from "../../../utils/supabase";

const query = supabase.from("EventAddress").select("*, Address(*)").single();

interface Props {
  address: QueryData<typeof query>;
}

export function AddressCard({ address }: Props) {
  return (
    <OpacityPressable
      style={styles.container}
      onPress={() => router.push(`/list/${address.id}`)}
    >
      <View style={styles.left}>
        <Octicons name="home" color="gray" size={32}></Octicons>
        <DText style={styles.text}>{`${address.Address?.number} ${address
          .Address?.street} ${abbreviateStreetType(
          address.Address!.type,
        )}`}</DText>
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
    </OpacityPressable>
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
