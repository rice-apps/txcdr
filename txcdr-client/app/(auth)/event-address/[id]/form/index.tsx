import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { DText } from "../../../../../components/styled-rn/DText";
import { useEffect, useState } from "react";
import { Tables } from "../../../../../types/supabase";
import { supabase } from "../../../../../utils/supabase";
import { WebView } from "react-native-webview";
import { Zinc } from "../../../../../utils/styles/colors";
import { addressToString } from "../../../list/helpers";
import { ms } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../../../../../components/nav/Header";
import { OpacityPressable } from "../../../../../components/styled-rn/OpacityPressable";
import * as Linking from "expo-linking";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Tables<"Event">>();
  const [address, setAddress] = useState<Tables<"EventAddress">>();

  useEffect(() => {
    const func = async () => {
      if (id) {
        const res = await supabase
          .from("EventAddress")
          .select("*, Event (*)")
          .eq("id", id)
          .single();
        if (res.error) {
          console.log(res.error, id);
          return;
        }
        setEvent(res.data.Event ?? undefined);
        setAddress(res.data);
      }
    };
    func();
  }, [id]);

  return (
    <View style={styles.container}>
      <Header title="Questions Form" />
      {event?.formLink && address && (
        <View style={styles.embedContainer}>
          <View style={styles.embedHeaderRow}>
            <DText style={styles.embedHeaderText}>
              Questions for {addressToString(address)}
            </DText>
            <OpacityPressable
              hitSlop={50}
              onPress={() => Linking.openURL(event.formLink)}
            >
              <MaterialIcons name="open-in-new" size={ms(24)} color="black" />
            </OpacityPressable>
          </View>
          <View style={styles.webviewContainer}>
            <WebView style={styles.webview} source={{ uri: event?.formLink }} />
          </View>
        </View>
      )}
    </View>
  );
}

const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  webviewContainer: {
    flex: 1,

    padding: 10,
    backgroundColor: Zinc[200],
    borderColor: Zinc[200],
    borderWidth: 4,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  webview: {
    flex: 1,
  },
  embedContainer: {
    flex: 1,
    marginTop: ms(10),
  },
  embedHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
    padding: ms(10),
    backgroundColor: Zinc[300],
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
  embedHeaderText: {
    fontSize: ms(16),
    width: "90%",
    fontWeight: "bold",
  },
});
