import React, { useState, useEffect, ChangeEvent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import convertExcelToJSON from './parser';
interface Question {
  sequence: number;
  field: string;
  descriptionOne: string;
  questionType: number;
  required: boolean;
  options: string[];
}

const FormBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeForm, setActiveForm] = useState<number | null>(null);

  useEffect(() => {
    // Assuming you have a way to obtain a file path string
    const filePath = "path/to/your/TXCDR.RiceApps.Questions.xlsx";

    convertExcelToJSON(filePath).then((parsedQuestions: Question[]) => {
      setQuestions(parsedQuestions);
    }).catch(error => {
      console.error('Error parsing file:', error);
    });
  }, []);

  // Utility to categorize questions by their sequence's hundredth place
  const categorizeQuestions = () => {
    const forms = questions.reduce((acc, question) => {
      const formKey = Math.floor(question.sequence / 100) * 100;
      if (!acc[formKey]) acc[formKey] = [];
      acc[formKey].push(question);
      return acc;
    }, {} as Record<number, Question[]>);

    return forms;
  };

  const renderQuestionInput = (question: Question) => {
    switch (question.questionType) {
      case 3: // Radio button
        // A simplistic approach to radio buttons; consider a library for actual use
        return question.options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => console.log(option)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        ));
      case 4: // Short text
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} placeholder="Short text" />;
      case 5: // 10-digit phone number
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} keyboardType="phone-pad" placeholder="Phone number" />;
      case 6: // 5-digit ZIP code
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} keyboardType="numeric" maxLength={5} placeholder="ZIP code" />;
      case 7: // Feet and inches
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} placeholder="Feet and Inches" />;
      case 8: // Valid email addresses
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} keyboardType="email-address" placeholder="Email address" />;
      case 9: // Long text
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} multiline={true} numberOfLines={4} placeholder="Long text" />;
      case 10: // Download (Assuming this might be a button to download something)
        return <TouchableOpacity onPress={() => console.log("Download action")}>
                 <Text>Download</Text>
               </TouchableOpacity>;
      case 11: // Number
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} keyboardType="numeric" placeholder="Number" />;
      default:
        return null;
    }
  };

  const renderForm = (formKey: number) => (
    <View key={formKey}>
      <Text>{`Form for ${formKey}`}</Text>
      {categorizeQuestions()[formKey].map((question, index) => (
        <View key={index}>
          <Text>{question.descriptionOne}</Text>
          {renderQuestionInput(question)}
        </View>
      ))}
    </View>
  );

  return (
    <View>
      {Object.keys(categorizeQuestions()).map((key) => (
        <TouchableOpacity key={key} onPress={() => setActiveForm(Number(key))}>
          <Text>{`Show Form ${key}`}</Text>
        </TouchableOpacity>
      ))}
      {activeForm && renderForm(activeForm)}
    </View>
  );
};

export default FormBuilder;
