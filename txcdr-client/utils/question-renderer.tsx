import { Link } from "expo-router";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Collapsible from "react-native-collapsible";
import FormBlock from "./form-block";

type Question = {
  sequence: number;
  field: string;
  descriptionOne: string;
  descriptionTwo: string;
  questionType: number;
  required: boolean;
  options: string[];
};

type QuestionRendererProp = Question[];

export default function QuestionRenderer({
  questions,
}: {
  questions: QuestionRendererProp;
}) {
  const renderQuestionInput = (question: Question) => {
    switch (question.questionType) {
      case 3: // Radio button simple
        return question.options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => console.log(option)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        ));
      case 4: // Short text
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            placeholder="Short text"
          />
        );
      case 5: // 10-digit phone number
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            keyboardType="phone-pad"
            placeholder="Phone number"
          />
        );
      case 6: // 5-digit ZIP code
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            keyboardType="numeric"
            maxLength={5}
            placeholder="ZIP code"
          />
        );
      case 7: // Feet and inches
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            placeholder="Feet and Inches"
          />
        );
      case 8: // Valid email addresses
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            keyboardType="email-address"
            placeholder="Email address"
          />
        );
      case 9: // Long text
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            multiline={true}
            numberOfLines={4}
            placeholder="Long text"
          />
        );
      case 10: // Download
        return (
          <TouchableOpacity onPress={() => console.log("Download action")}>
            <Text>Download</Text>
          </TouchableOpacity>
        );
      case 11: // Number
        return (
          <TextInput
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 10 }}
            keyboardType="numeric"
            placeholder="Number"
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {questions.map((question, index) => (
        <View
          key={question.sequence.toString()}
          style={styles.questionContainer}
        >
          <Text style={styles.questionText}>{question.descriptionOne}</Text>
          {renderQuestionInput(question)}
        </View>
      ))}
    </ScrollView>
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

  questionContainer: {
    marginBottom: 20, // Add space between questions
  },
  questionText: {
    fontWeight: "bold", // Make question label bold
    marginBottom: 10, // Space between question label and input
  },
});
