import {
    StyleSheet, Text
  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type CensusBlockProps = {
    


};

export default function CensusBlock(props: CensusBlockProps) {
    return (
    <SafeAreaView>
        <SafeAreaView style={styles.container}>    
        <Text style={styles.text}>#1234</Text>
      </SafeAreaView>
    </SafeAreaView>

        );
}


const styles = StyleSheet.create({
    padding: {
        paddingTop: 0,
        height: 10,
        paddingBottom: 0,
    },

    container: {
        backgroundColor: "#F1A220",
        width: 305,
        borderRadius: 20,
        left: 35,  
        height: 40,
        },


    text: {
        fontSize: 20,
        paddingLeft: 20,
        bottom: 10,

        }
  });
  




