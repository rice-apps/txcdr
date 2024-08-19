import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { StatusName } from "../../map/EventCallout";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Tables } from "../../../../types/supabase";
import { supabase } from "../../../../utils/supabase";
import { ms } from "react-native-size-matters";
import { Header } from "../../../../components/nav/Header";
import { addressToString } from "../helpers";
import { WideButton } from "../../../../components/buttons/WideButton";
import { DText } from "../../../../components/styled-rn/DText";
import { useUser } from "../../../../utils/hooks/useUser";
import { Blue, Zinc } from "../../../../utils/styles/colors";
import { QueryData } from "@supabase/supabase-js";

export default function Page() {
  const addressId = useLocalSearchParams().info as string;
  const query = supabase
    .from("EventAddress")
    .select("*, Address (*)")
    .eq("id", addressId)
    .single();

  type AddressData = QueryData<typeof query>;
  const [address, setAddress] = useState<AddressData>();
  const [claimState, setClaimState] = useState<
    "CLAIMED BY ANOTHER" | "UNCLAIMED" | "CLAIMED BY USER"
  >("CLAIMED BY ANOTHER");
  const user = useUser();

  useEffect(() => {
    const func = async () => {
      if (user) {
        const res = await query;
        if (res.error || !res.data.Address) {
          console.log(res.error, addressId);
          Alert.alert("Failed to fetch address", res.error!.message);
          return;
        }

        if (res.data.claimerId === null) {
          setClaimState("UNCLAIMED");
        } else if (res.data.claimerId === user?.id) {
          setClaimState("CLAIMED BY USER");
        } else {
          setClaimState("CLAIMED BY ANOTHER");
        }
        res.data.Address.blockId;
        setAddress(res.data);
      }
    };
    func();
  }, [user]);

  const onClaim = async () => {
    if (user) {
      const res = await supabase
        .from("EventAddress")
        .update({ claimerId: user?.id })
        .eq("id", addressId);
      if (res.error) {
        console.log(res.error);
        Alert.alert("Failed to claim address", res.error.message);
        return;
      }
      setClaimState("CLAIMED BY USER");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", gap: ms(30) }}
    >
      <Header title="Address Info" />
      <View style={styles.body}>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewTitleRow}>
            {/* Home Icon */}
            <Ionicons name="home-outline" size={24} color="white" />
            {/* Address Name */}
            {address?.Address && (
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  fontWeight: "semibold",
                  color: "white",
                }}
              >
                {addressToString(address.Address)}
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              gap: 20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "semibold",
                textTransform: "uppercase",
                textAlign: "right",
                width: "35%",
                color: "#5360F3",
              }}
            >
              Status
            </Text>
            <StatusName text={"Status"}></StatusName>
          </View>
          <Divider
            style={{ borderWidth: 1, borderColor: "lightgray", width: "90%" }}
          ></Divider>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              gap: 20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "semibold",
                textTransform: "uppercase",
                textAlign: "right",
                width: "35%",
                color: "#5360F3",
              }}
            >
              OWNER
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Name</Text>
          </View>
          <Divider
            style={{ borderWidth: 1, borderColor: "lightgray", width: "90%" }}
          ></Divider>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              gap: 20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "semibold",
                textTransform: "uppercase",
                textAlign: "right",
                width: "35%",
                color: "#5360F3",
              }}
            >
              HOUSEHOLD SIZE
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Name</Text>
          </View>
          <Divider
            style={{ borderWidth: 1, borderColor: "lightgray", width: "90%" }}
          ></Divider>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              gap: 20,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "semibold",
                textTransform: "uppercase",
                textAlign: "right",
                width: "35%",
                color: "#5360F3",
              }}
            >
              DISASTER TYPE
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "semibold" }}>Name</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#5360F3",
              marginTop: 20,
            }}
          >
            Condition
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "medium",
              color: "black",
              marginTop: 10,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        {/* Photos section */}
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#5360F3",
              marginTop: 20,
            }}
          >
            Photos
          </Text>
          <FlatList
            horizontal={true}
            renderItem={({ item }) => (
              <View
                style={{
                  width: 200,
                  height: 200,
                  backgroundColor: "lightgray",
                  borderRadius: 10,
                  margin: 10,
                }}
              ></View>
            )}
            data={[1, 2, 3, 4, 5]}
          ></FlatList>
        </View>
        <View>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#5360F3",
              marginTop: 20,
            }}
          >
            Survey Forms
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "medium",
              color: "black",
              marginTop: 10,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <WideButton
          style={{
            backgroundColor: claimState == "UNCLAIMED" ? Blue[500] : Zinc[500],
          }}
          disabled={claimState != "UNCLAIMED"}
          onPress={onClaim}
        >
          <DText style={styles.claimButtonText}>
            {claimState == "UNCLAIMED"
              ? "Claim"
              : claimState == "CLAIMED BY USER"
              ? "Claimed by you"
              : "Claimed by another user"}
          </DText>
        </WideButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: ms(20),
    marginBottom: ms(20),
  },
  body: {
    gap: ms(30),
    width: "85%",
  },
  overviewContainer: {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#5360F3",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  overviewTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5360F3",
    width: "100%",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
  },
  claimButtonText: {
    fontWeight: "bold",
    fontSize: ms(16),
    color: "white",
  },
});
