// Form.tsx
import React, { useState, useEffect } from 'react';
import parseSpreadsheet from './parse_spreadsheet';
import { Question } from './types';

const Form: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch('/txcdr_spreadsheet.xlsx')
      .then(response => response.arrayBuffer())
      .then(buffer => parseSpreadsheet(buffer))
      .then(data => setQuestions(data))
      .catch(error => console.error('Error loading Excel file:', error));
  }, []);

  return (
    <div>
      {questions.map((item, index) => (
        <div key={index}>
          <label>{item.question}</label>
          {/* Additional form rendering logic based on item.type */}
        </div>
      ))}
    </div>
  );
};

export default Form;
