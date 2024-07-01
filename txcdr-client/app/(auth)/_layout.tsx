import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { Slot, router } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaFlex } from "../../components/SafeAreaFlex";
import { NavBar } from "../../components/nav/NavBar";

export default function Protected() {
  console.log("prot trigger");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("prot useeffect");
    supabase.auth
      .getUser()
      .then((res) => {
        if (!res.data.user) {
          console.log("kicked out of prot");
          router.replace("/login");
        }
      })
      .catch((e) => {
        console.log("err: " + e);
        router.replace("/login");
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("state change!");
        if (!session?.user) {
          console.log("kicked out of prot bc state change");
          router.replace("/login");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaFlex disableBottomSafeArea>
        <Slot />
      </SafeAreaFlex>
      <NavBar />
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
