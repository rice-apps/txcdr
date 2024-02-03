import React, { useState, useEffect, ChangeEvent } from 'react';
import convertExcelToJSON from './parser';
import RadioQuestion from './radioquestions';
import TextQuestion from './textquestions';

interface Question {
  descriptionOne: string;
  options: string[];
  questionType: number; // Assuming this indicates the type of question
}

const FormBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Simulated file path (in reality, you would get this from a file input and server processing)
    const filePath = "TXCDR.RiceApps.Questions.xlsx";

    // Directly use the filePath for development/testing purposes
    convertExcelToJSON(filePath).then(parsedQuestions => {
      setQuestions(parsedQuestions); // Assuming parsedQuestions is already in the correct format
    }).catch(error => console.error('Error parsing Excel file:', error));
  }, []);

  const renderQuestion = (question: Question, index: number) => {
    const key = `question-${index}`;
    switch (question.questionType) {
      case 3: // 3 indicates a radio question
        return (
          <RadioQuestion
            key={key}
            description={question.descriptionOne}
            options={question.options}
            name={key}
          />
        );
      case 4: // 4 indicates a text input question
        return (
          <TextQuestion
            key={key}
            description={question.descriptionOne}
            name={key}
          />
        );
      // Define more cases for other question types as needed
      default:
        return null; // Or a placeholder component for unrecognized types
    }
  };

  return (
    <div>
      <form>{questions.map((question, index) => renderQuestion(question, index))}</form>
    </div>
  );
};

export default FormBuilder;
