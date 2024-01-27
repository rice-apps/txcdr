import React, { useState, useEffect } from "react";
import convertExcelToJSON from "./parser";

interface Question {
  descriptionOne: string;
  options: string[];
}

const FormBuilder: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Define the file path to your Excel file
    const filePath = "TXCDR.RiceApps.Questions.xlsx";

    // Use the parser function to get the question data
    convertExcelToJSON(filePath).then((parsedQuestions: any) => {
      // Map the data to the desired format
      const simplifiedQuestions = parsedQuestions.map((q: any) => ({
        descriptionOne: q.descriptionOne,
        options: q.options,
      }));
      setQuestions(simplifiedQuestions);
    });
  }, []);

  const renderOption = (
    option: string,
    index: number,
    questionIndex: number,
  ) => (
    <label key={`${questionIndex}-${index}`}>
      <input type="radio" name={`question-${questionIndex}`} value={option} />
      {option}
    </label>
  );

  const renderQuestion = (question: Question, index: number) => (
    <div key={`question-${index}`}>
      <p>{question.descriptionOne}</p>
      <div>
        {question.options.map((option, optIndex) =>
          renderOption(option, optIndex, index),
        )}
      </div>
    </div>
  );

  return <form>{questions.map(renderQuestion)}</form>;
};

export default FormBuilder;
