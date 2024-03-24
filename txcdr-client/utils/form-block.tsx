import {
    Text,
    StyleSheet,
    View,
    Image,
    ScrollView,
    Button,
    TextInput,
  } from "react-native";
  import Collapsible from 'react-native-collapsible';
  import React, { useState } from 'react'; 

  type Question = {
    sequence: number;
    field: string;
    descriptionOne: string;
    descriptionTwo: string;
    questionType: number;
    required: boolean;
    options: string[];
  };

  type FormBlockProps = {
    formName: string,
    question: Question[],
};


export default function FormBlock(props: FormBlockProps) {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const formName = "Form Name";
    
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);

      };

    const [firstName, onChangeFirstName] = React.useState('John');
    const [lastName, onChangeLastName] = React.useState('Doe');

    return (
        <View style={styles.block}>
            <View style={[styles.headerBlock, isCollapsed ? styles.collapsedHeader : styles.expandedHeader]}>                
                <Button onPress={toggleCollapse} title = {formName} color = "white"></Button>
            </View>
            <Collapsible collapsed={isCollapsed}>
                <View style={{padding: 10}}>
                    <Text>First Name</Text>
                    <TextInput
        style={styles.input}
        onChangeText={onChangeFirstName}
        value={firstName}
      />

                    <Text>Last Name</Text>
                    <TextInput
        style={styles.input}
        onChangeText={onChangeLastName}
        value={lastName}
      />
                    

                </View>
            </Collapsible>
        </View>

    );

}

const styles = StyleSheet.create({
    block: {
        width: 350,
        left: 20,
        borderWidth: 1,
        borderRadius: 15,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            width: 1,
            height: -1,
        }

      },

    headerBlock: {
        backgroundColor: "black",
        width: 350,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // borderWidth: 1,
        height: 50,
    },

    expandedHeader: {
        borderBottomLeftRadius: 0, // Original radius
        borderBottomRightRadius: 0,   // Original radius
    },
    collapsedHeader: {
        borderBottomLeftRadius: 15, // New radius when collapsed
        borderBottomRightRadius: 15,  // New radius when collapsed
    },

    button: {
        fontWeight: "bold",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});