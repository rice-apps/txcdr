import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { AuthInput } from "../../components/input/AuthInput";
import { supabase } from "../../utils/supabase";
import { DText } from "../../components/styled-rn/DText";
import { MaterialIcons } from "@expo/vector-icons";
import { Zinc } from "../../utils/styles/colors";
import { ms, s, scale } from "react-native-size-matters";
import { WideButton } from "../../components/buttons/WideButton";
import { LinkTextStyle } from "../../utils/styles/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaFlex } from "../../components/SafeAreaFlex";

export default function Signup() {
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (email.length > 0 && pass.length > 0) {
      setLoading(true);
      console.log("valid");
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: pass,
      });
      if (error) {
        Alert.alert(error.message);
      } else if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        Alert.alert("Email already in use!");
      } else {
        console.log(data);
        router.replace({
          pathname: "/verify",
          params: { email, name },
        });
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaFlex>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.outerView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: scale(5), alignItems: "center" }}>
          <DText
            style={{
              fontSize: ms(26),
              fontWeight: "bold",
            }}
          >
            Create an account
          </DText>
          <DText style={{ fontSize: ms(13), color: Zinc[400] }}>
            Welcome! Please enter your details.
          </DText>
        </View>
        <View style={styles.formView}>
          <AuthInput
            labelText="Email*"
            icon={
              <MaterialIcons
                name="mail-outline"
                size={ms(24, 0.25)}
                color={Zinc[400]}
              />
            }
            setter={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <AuthInput
            labelText="Name"
            icon={
              <MaterialIcons
                name="account-circle"
                size={ms(24, 0.25)}
                color={Zinc[400]}
              />
            }
            setter={setName}
            placeholder="Enter your name"
          />
          <AuthInput
            labelText="Password*"
            icon={
              <MaterialIcons
                name="lock-outline"
                size={ms(24, 0.25)}
                color={Zinc[400]}
              />
            }
            setter={setPass}
            secureTextEntry
            keyboardType="visible-password"
            placeholder="Enter password"
            selectTextOnFocus
          />
        </View>
        <View style={styles.bottomView}>
          <WideButton disabled={loading} onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <DText style={{ color: Zinc[100], fontWeight: "bold" }}>
                Sign up
              </DText>
            )}
          </WideButton>
          <View style={{ flexDirection: "row" }}>
            <DText>Already have an account? </DText>
            <Pressable
              onPress={() => router.navigate("/login")}
              hitSlop={s(20)}
            >
              <DText style={LinkTextStyle}>Log in</DText>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaFlex>
  );
}

const styles = StyleSheet.create({
  outerView: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    marginHorizontal: "auto",
  },
  formView: {
    rowGap: ms(26),
    width: "100%",
    flexDirection: "column",
    marginTop: scale(36),
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    alignItems: "center",
    gap: ms(26),
    marginTop: ms(40),
  },
});
