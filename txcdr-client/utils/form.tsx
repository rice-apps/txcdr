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
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
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
  };

  const testQuestions: Question[] = [
    {
      sequence: 1,
      field: "firstName",
      descriptionOne: "First Name",
      descriptionTwo: "",
      questionType: 4,
      required: true,
      options: [],
    },
    {
      sequence: 2,
      field: "lastName",
      descriptionOne: "Last Name",
      descriptionTwo: "",
      questionType: 4,
      required: true,
      options: [],
    },
    {
      sequence: 3,
      field: "contactNumber",
      descriptionOne: "Contact Number",
      descriptionTwo: "Please enter a 10-digit phone number",
      questionType: 5,
      required: true,
      options: [],
    },
    {
      sequence: 4,
      field: "zipCode",
      descriptionOne: "ZIP Code",
      descriptionTwo: "Please enter a 5-digit ZIP code",
      questionType: 6,
      required: true,
      options: [],
    },
    {
      sequence: 5,
      field: "email",
      descriptionOne: "Email Address",
      descriptionTwo: "Please enter a valid email address",
      questionType: 8,
      required: true,
      options: [],
    },
    {
      sequence: 6,
      field: "residenceType",
      descriptionOne: "Residence Type",
      descriptionTwo: "What type of residence is this?",
      questionType: 3,
      required: false,
      options: ["Single Family Home", "Duplex", "Apartment"],
    },
    {
      sequence: 7,
      field: "comments",
      descriptionOne: "Additional Comments",
      descriptionTwo:
        "If you have any additional comments or notes, please enter them here",
      questionType: 9,
      required: false,
      options: [],
    },
  ];

  type FormBlock = {
    header: string; //eg: 100-199
    formName: string; //Personal Information
    questions: Question[];
  };

  const [formBlocks, setFormBlocks] = useState<FormBlock[]>([]);

  //render and populate formBlocks upon page call

  return (
    <SafeAreaView style={{ alignContent: "center" }}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Volunteer Form</Text>
      </View>

      <ScrollView>
        <FormBlock
          formName="Personal Information"
          question={testQuestions}
        ></FormBlock>
        <View style={styles.spacer}></View>
        <FormBlock
          formName="Contact Information"
          question={testQuestions}
        ></FormBlock>
        <View style={styles.spacer}></View>
        <FormBlock
          formName="Property Information"
          question={testQuestions}
        ></FormBlock>
        <View style={styles.spacer}></View>
        <FormBlock
          formName="Impact Assessment"
          question={testQuestions}
        ></FormBlock>
        <View style={styles.spacer}></View>

        <View style={styles.submitButton}>
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
    borderBottomColor: "black",
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
