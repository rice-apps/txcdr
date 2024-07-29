import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { supabase } from "../../../utils/supabase";
import React, { useEffect, useState } from "react";
import { DText } from "../../../components/styled-rn/DText";
import { Zinc } from "../../../utils/styles/colors";
import { msc, sc } from "../../../utils/size-matters-aliases";
import { WideButton } from "../../../components/buttons/WideButton";
import { DigitRow } from "./DigitRow";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinkTextStyle } from "../../../utils/styles/styles";
import { SafeAreaFlex } from "../../../components/SafeAreaFlex";

export default function Verify() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  let { email, name } = useLocalSearchParams<{ email: string; name: string }>();

  useEffect(() => {
    supabase.auth
      .getUser()
      .then((res) => {
        if (res.data.user) {
          console.log("user already has a session");
          router.replace("/dashboard");
        } else {
          console.log("user should be on this page (verify page)");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = async () => {
    if (email) {
      setLoading(true);
      console.log("verify attempt");
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: code,
        type: "signup",
      });
      if (error) {
        Alert.alert(error.message);
      } else if (data.user) {
        const { status, error } = await supabase
          .from("User2")
          .insert({ id: data.user.id, email: email, role: "USER" });
        if (status === 201) {
          router.replace("/dashboard");
        } else {
          Alert.alert(
            `${error?.message ?? "Something went wrong..."} (Code ${status})`,
          );
        }
      }
      setLoading(false);
    }
  };

  const onResend = async () => {
    const { error } = await supabase.auth.resend({
      email: email ?? "",
      type: "signup",
    });
    if (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaFlex>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.outerView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: msc(5), alignItems: "center" }}>
          <DText
            style={{
              fontSize: msc(26),
              fontWeight: "bold",
            }}
          >
            Check your email!
          </DText>
          <DText
            style={{ fontSize: msc(13), color: Zinc[400], textAlign: "center" }}
          >
            Type the verification code sent to{" "}
            <DText style={{ fontWeight: "bold" }}>{email}</DText>
          </DText>
        </View>
        <View style={styles.formView}>
          <DigitRow numDigits={6} setter={setCode} />
        </View>
        <View style={styles.bottomView}>
          <DText style={LinkTextStyle} onPress={onResend}>
            Resend code
          </DText>
          <WideButton disabled={loading} onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <DText style={{ color: Zinc[100], fontWeight: "bold" }}>
                Verify
              </DText>
            )}
          </WideButton>
          <Pressable onPress={() => router.back()} hitSlop={sc(20)}>
            <DText style={LinkTextStyle}>{"< "} Go back to sign up</DText>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaFlex>
  );
}

const styles = StyleSheet.create({
  outerView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "85%",
    marginHorizontal: "auto",
  },
  formView: {
    marginTop: msc(36),
  },
  bottomView: {
    width: "100%",
    alignItems: "center",
    gap: msc(26),
    marginTop: msc(26),
  },
});
