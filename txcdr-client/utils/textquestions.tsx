import React from 'react';

interface Props {
  description: string;
  name: string;
}

const TextQuestion: React.FC<Props> = ({ description, name }) => (
  <div>
    <p>{description}</p>
    <input type="text" name={name} />
  </div>
);

export default TextQuestion;
