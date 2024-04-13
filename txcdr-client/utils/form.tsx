import { Link } from "expo-router";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'; 
import Collapsible from 'react-native-collapsible';
import FormBlock from "./form-block";

export default function Form() {
    type Question = {
      sequence: number;
      field: string;
      descriptionOne: string;
      descriptionTwo: string;
      questionType: number;
      required: boolean;
      options: string[];
    }

    type FormBlock = {
      header: string; //eg: 100-199
      formName: string; //Personal Information
      questions: Question[]; 
      
    }

    const [formBlocks, setFormBlocks] = useState<FormBlock[]>([]); 

    //render and populate formBlocks upon page call

  return (
    <SafeAreaView style={{ alignContent: "center" }}>
        <View style={styles.header}>

        <Text style={styles.pageTitle}>Form Title</Text>
      </View>

      <ScrollView>

      <FormBlock formName="Personal Information"></FormBlock>
      <View style={styles.spacer}></View>
      <FormBlock formName="Contact Information"></FormBlock>
      <View style={styles.spacer}></View>
      <FormBlock formName="Property Information"></FormBlock>
      <View style={styles.spacer}></View>
      <FormBlock formName="Impact Assessment"></FormBlock>
      <View style={styles.spacer}></View>


      <View  style={styles.submitButton}>
        <Button title="Submit"></Button>
      </View>
      <SafeAreaView style={styles.footer}></SafeAreaView>
      </ScrollView>

        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    header: {
        // paddingTop: -30,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    footer: {
      height: 150,
    },
    seperator: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 300,
        left: 15,
    },
    backIcon: {
        width: 15,
        height: 20,
    },
    spacer: {
      height: 20,
    },
    pageTitle: {
        fontWeight: "bold",
        fontSize: 24,
        paddingLeft: 15,
        paddingBottom: 15,
    },
    box: {
        borderRadius: 10,
        borderColor: "#5360F3",
        borderWidth: 2,
        width: 330,
        height: 200,
        left: 30,
    }, 

    submitButton: {
      left: 120,
      borderWidth: 1,
      width: 150,
      height: 40,
    },
    addressHeader: {
        paddingTop: 10,
        alignSelf: "center",
        color: "white",
        fontSize: 20,

    },
    subHeading: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: "#5360F3",
        textAlign: "left",

    },
    filling: {
        backgroundColor: "#5360F3",
        width: 327,
        height: 45,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        left: 0,
    },
    heading: {
        color: "#5360F3",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 35,
        paddingBottom: 5,
        paddingTop: 20,
    },
    description: {
        paddingLeft: 35,

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },



});
