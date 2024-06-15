import React from "react";

interface AnswerInputProps {
  answer: string;
  setAnswer: (answer: string) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  answer,
  setAnswer,
  onKeyPress,
}) => {
  return (
    <input
      type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      onKeyPress={onKeyPress}
    />
  );
};

export default AnswerInput;
