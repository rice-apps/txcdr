import React from 'react';

interface Props {
  description: string;
  options: string[];
  name: string;
}

const RadioQuestion: React.FC<Props> = ({ description, options, name }) => (
  <div>
    <p>{description}</p>
    {options.map((option, index) => (
      <label key={index}>
        <input type="radio" name={name} value={option} />
        {option}
      </label>
    ))}
  </div>
);

export default RadioQuestion;
