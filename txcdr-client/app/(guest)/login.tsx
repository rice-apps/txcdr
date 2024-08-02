import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthInput } from "../../components/input/AuthInput";
import { supabase } from "../../utils/supabase";
import { DText } from "../../components/styled-rn/DText";
import { MaterialIcons } from "@expo/vector-icons";
import { Zinc } from "../../utils/styles/colors";
import { WideButton } from "../../components/buttons/WideButton";
import { LinkTextStyle } from "../../utils/styles/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaFlex } from "../../components/SafeAreaFlex";
import { ms, s } from "react-native-size-matters";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (email && pass) {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        Alert.alert(error.message);
      } else {
        console.log("Auth successful");
        router.replace("/dashboard");
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
        <View style={{ gap: ms(5), alignItems: "center" }}>
          <DText
            style={{
              fontSize: ms(26),
              fontWeight: "bold",
            }}
          >
            Log into your account
          </DText>
          <DText style={{ fontSize: ms(13), color: Zinc[700] }}>
            Welcome back! Please enter your details.
          </DText>
        </View>
        <View style={styles.formView}>
          <AuthInput
            labelText="Email"
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
            labelText="Password"
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
            placeholder="Enter your password"
            selectTextOnFocus
          />
        </View>
        <View style={styles.bottomView}>
          <Pressable>
            <DText style={LinkTextStyle}>Forgot password?</DText>
          </Pressable>
          <WideButton disabled={loading} onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <DText style={{ color: Zinc[100], fontWeight: "bold" }}>
                Log in
              </DText>
            )}
          </WideButton>
          <View style={{ flexDirection: "row" }}>
            <DText>Don't have an account? </DText>
            <Pressable
              onPress={() => router.navigate("/signup")}
              hitSlop={s(20)}
            >
              <DText style={LinkTextStyle}>Sign up</DText>
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
    marginTop: ms(36),
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    alignItems: "center",
    gap: ms(26),
    marginTop: ms(15),
  },
});
