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


interface Form {
  title: string;
  questions: Question[];
}

const FormBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeFormKey, setActiveFormKey] = useState<number | null>(null);

  useEffect(() => {
    // Assuming you have a way to obtain a file path string
    const filePath = "./TXCDR.RiceApps.Questions.xlsx";

    convertExcelToJSON(filePath).then((parsedQuestions: Question[]) => {
      setQuestions(parsedQuestions);
    }).catch(error => {
      console.error('Error parsing file:', error);
    });
  }, []);

  // Utility to categorize questions by their sequence's hundredth place
  const categorizeQuestions = (questions: Question[]): Record<number, Form> => {
    // Initialize an empty object with a more specific type
    const forms: Record<number, Form> = {};
  
    // Iterate over each question to categorize them into forms
    questions.forEach((question) => {
      const formKey = Math.floor(question.sequence / 100) * 100;
  
      // Check if the formKey is a header (ending in 00) and initialize the form
      if (question.sequence % 100 === 0) {
        if (!forms[formKey]) {
          forms[formKey] = {
            title: question.descriptionOne,
            questions: [],
          };
        }
      } else {
        // For non-header questions, add them to the respective form
        // This also checks if the form exists to handle questions that might not directly follow a header
        if (!forms[formKey]) {
          forms[formKey] = {
            title: `Form ${formKey}`, // Placeholder title, in case there's no explicit header
            questions: [],
          };
        }
        forms[formKey].questions.push(question);
      }
    });
  
    return forms;
  };

  const renderQuestionInput = (question: Question) => {
    switch (question.questionType) {
      case 3: // Radio button simple
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
      case 10: // Download
        return <TouchableOpacity onPress={() => console.log("Download action")}>
                 <Text>Download</Text>
               </TouchableOpacity>;
      case 11: // Number
        return <TextInput style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} keyboardType="numeric" placeholder="Number" />;
      default:
        return null;
    }
  };

  
  const categorizedForms = categorizeQuestions(questions);

  // Adjusted to directly work with form objects
  const renderForm = (formKey: number) => {
    const form = categorizedForms[formKey];
    if (!form) return null; // Guard against undefined forms

    return (
      <View>
        <Text>{form.title}</Text>
        {form.questions.map((question) => (
            <View key={question.sequence}>
              <Text>{question.descriptionOne}</Text>
              {renderQuestionInput(question)}
            </View>
        ))}
      </View>
    );
  };
  

  return (
    <View>
      {Object.keys(categorizedForms).map((key) => (
        <TouchableOpacity key={key} onPress={() => setActiveFormKey(Number(key))}>
          <Text>{`Show Form ${key}`}</Text>
        </TouchableOpacity>
      ))}
      {activeFormKey !== null && renderForm(activeFormKey)}
    </View>
  );
};

export default FormBuilder;
