import { Link } from "expo-router";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProgressBarProps = {
    text : String,
};

export default function Severity(props: ProgressBarProps) {

  const {text} = props;

  const backgroundColor = text === 'Severe' ? 'red' : text === 'Moderate' ? 'orange' : text === 'Low' ? 'green' : 'transparent';
  const width = text === 'Severe' ? 60 : text === 'Moderate' ? 70 : text === 'Low' ? 40 : 0;
  const left = text === 'Severe' ? 240 : text === 'Moderate' ? 230 : text === 'Low' ? 260 : 0; 

  return (
    <SafeAreaView style={[styles.severityBackground, { backgroundColor }, {width}, {left}]}>    
    <Text style={styles.severityLabel}>{props.text}</Text>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  severityBackground: {
    width: 60,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    left: 235,

  },

  severityLabel: {
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 35,
    color: "white",

  }

});
