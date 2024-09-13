import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { PageButton } from "./PageButton";
import { useEffect, useState } from "react";
import { useRole } from "../../../utils/hooks/useRole";
import { ms } from "react-native-size-matters";
import { Header } from "../../../components/nav/Header";
import { Divider } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { WideButton } from "../../../components/buttons/WideButton";
import { supabase } from "../../../utils/supabase";

export default function Page() {
  const [buttons, setButtons] = useState([
    <PageButton
      href="/profile"
      label="Profile"
      icon={<Ionicons name="person-outline" color="black" size={36} />}
      key={"/profile"}
    />,
  ]);
  const [role, loading] = useRole();

  useEffect(() => {
    if (!loading) {
      if (role != "USER")
        setButtons([
          ...buttons,
          <PageButton
            href="/admin-list"
            label="Admins"
            icon={<Ionicons name="person-outline" color="black" size={36} />}
            key={"/admin-list"}
          />,
        ]);
    }
  }, [role, loading]);

  return (
    <FlatList
      style={styles.container}
      data={buttons}
      renderItem={(item) => item.item}
      ItemSeparatorComponent={() => <Divider style={styles.itemSeparator} />}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={<Header title="Settings" />}
      ListHeaderComponentStyle={{ marginBottom: ms(20) }}
      ListFooterComponent={
        <WideButton
          style={styles.signOutButton}
          onPress={() => supabase.auth.signOut()}
        >
          <DText style={styles.signOutText}>Sign out</DText>
        </WideButton>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(20),
    marginTop: ms(20),
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 15,
    paddingBottom: 15,
    marginTop: ms(30),
  },
  listContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: ms(20),
    justifyContent: "center",
    gap: ms(10),
  },
  itemSeparator: { marginHorizontal: 20, marginTop: ms(10) },
  signOutButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ff0000",
    borderWidth: 1,
    backgroundColor: "transparent",
    opacity: 0.5,
    marginTop: ms(20),
  },
  signOutText: {
    color: "#ff0000",
  },
});
