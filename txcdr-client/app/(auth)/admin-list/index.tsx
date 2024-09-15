import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { DText } from "../../../components/styled-rn/DText";
import { useRole } from "../../../utils/hooks/useRole";
import { router } from "expo-router";
import { Header } from "../../../components/nav/Header";
import { SearchBar } from "../../../components/input/SearchBar";
import { useEffect, useState } from "react";
import { ms } from "react-native-size-matters";
import { supabase } from "../../../utils/supabase";
import { Tables } from "../../../types/supabase";
import { useUser } from "../../../utils/hooks/useUser";
import { Blue, Zinc } from "../../../utils/styles/colors";
import { HandledModal } from "../../../components/modals/HandledModal";
import { DTextInput } from "../../../components/styled-rn/DTextInput";
import { BORDER_RADIUS } from "../../../utils/styles/constants";
import { WideButton } from "../../../components/buttons/WideButton";
import { UserInfo } from "../../../components/UserInfo";
import { OpacityPressable } from "../../../components/styled-rn/OpacityPressable";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const user = useUser();
  const [role, loading] = useRole();
  const [query, setQuery] = useState("");
  const [admins, setAdmins] = useState<Tables<"User2">[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addAdminEmail, setAddAdminEmail] = useState("");
  const [adminType, setAdminType] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");

  useEffect(() => {
    const func = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("User2")
          .select("*")
          .neq("role", "USER")
          .neq("email", user.email);
        if (error) {
          Alert.alert("Error", error.message);
          console.log(error);
          return;
        }

        if (data) {
          setAdmins(data);
        }
      }
    };
    func();
  }, [user]);

  const toggleAddModal = () => {
    setAddModalVisible(!addModalVisible);
  };

  const onAddAdminSubmit = async () => {
    if (addAdminEmail == "") {
      Alert.alert("Please provide an email to promote to admin.");
      return;
    }
    const { data, error } = await supabase
      .from("User2")
      .update({ role: adminType })
      .eq("email", addAdminEmail)
      .select()
      .single();
    console.log(error, data);
    if (error || !data) {
      Alert.alert(
        `We weren't able to promote user ${addAdminEmail} to admin. The provided email may be incorrect.`,
        error?.message,
      );
      console.log(error);
      return false;
    }
    setAdmins([...admins, data]);
    return true;
  };

  const onAdminRemove = async (email: string) => {
    Alert.alert("Are you sure?", `Remove admin ${email}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: async () => {
          const { error } = await supabase
            .from("User2")
            .update({ role: "USER" })
            .eq("email", email);
          if (error) {
            Alert.alert("Error", error.message);
            console.error(error);
          }
          setAdmins(admins.filter((admin) => admin.email != email));
        },
      },
    ]);
  };

  const filterAdmin = (admin: Tables<"User2">) => {
    if (query == "") {
      return true;
    }
    return admin.email.includes(query) || admin.name?.includes(query);
  };

  if (loading || user == null) {
    return <ActivityIndicator size="large" />;
  }

  if (role != "ADMIN" && role != "SUPERADMIN") {
    router.navigate("/dashboard");
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Admin list" />
      </View>
      <View style={styles.body}>
        <SearchBar placeholder="Search admins..." onChangeText={setQuery} />
        <FlatList
          data={admins}
          contentContainerStyle={{ gap: 20 }}
          renderItem={(item) =>
            filterAdmin(item.item) ? (
              <View style={styles.adminCard}>
                <UserInfo
                  name={item.item.name}
                  subtext={
                    (item.item.role?.charAt(0) ?? "") +
                    item.item.role?.slice(1).toLowerCase()
                  }
                />
                <OpacityPressable
                  onPress={() => {
                    console.log("Remove admin", item.item.email);
                    onAdminRemove(item.item.email);
                  }}
                >
                  <Ionicons
                    name="remove-circle"
                    size={ms(28)}
                    color="#ee0000"
                  />
                </OpacityPressable>
              </View>
            ) : null
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <OpacityPressable
          onPress={toggleAddModal}
          style={{
            alignContent: "flex-end",
            backgroundColor: Blue[500],
            borderRadius: 20,
            marginBottom: ms(20),
            marginRight: ms(20),
          }}
        >
          <DText
            style={{
              color: "#ffffff",
              paddingHorizontal: ms(20),
              paddingVertical: ms(15),
            }}
          >
            + Add admin
          </DText>
        </OpacityPressable>
      </View>
      <HandledModal
        isVisible={addModalVisible}
        onBackdropPress={toggleAddModal}
        onSwipeComplete={toggleAddModal}
      >
        <View style={styles.addModalContent}>
          <DText style={styles.addModalTitle}>Add an admin</DText>
          <DTextInput
            placeholder="Type in user's email..."
            style={styles.adminInput}
            onChangeText={setAddAdminEmail}
          />
          <WideButton
            style={{ width: "100%", backgroundColor: Blue[500] }}
            onPress={async () => {
              if (await onAddAdminSubmit()) {
                toggleAddModal();
              }
            }}
          >
            <DText style={{ fontWeight: "bold", color: "white" }}>
              Promote to admin
            </DText>
          </WideButton>
        </View>
      </HandledModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: ms(20),
  },
  header: { marginTop: ms(20) },
  body: {
    padding: ms(20),
    flex: 1,
    gap: ms(20),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addModalContent: {
    padding: ms(20),
    gap: ms(20),
    alignItems: "center",
  },
  addModalTitle: { fontWeight: "bold", fontSize: 20 },
  adminInput: {
    width: "100%",
    borderRadius: BORDER_RADIUS,
    borderColor: Zinc[400],
    borderWidth: 1,
    padding: ms(10),
  },
  adminCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
