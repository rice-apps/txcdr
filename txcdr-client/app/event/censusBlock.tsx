import {
    StyleSheet, Text, View
  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type CensusBlockProps = {
    censusNumber: string;


};

export default function CensusBlock(props: CensusBlockProps) {
    return (
    <View style={{paddingTop: 5, paddingBottom: 5,}}>
        <View style={styles.container}>    
        <Text style={styles.text}>{props.censusNumber}</Text>
      </View>
    </View>

        );
}


const styles = StyleSheet.create({
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
        paddingTop: 5,

        }
  });
  




