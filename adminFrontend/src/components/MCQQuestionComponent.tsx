import React from 'react';
import { MCQQuestion } from '../types';

interface MCQQuestionComponentProps {
  question: MCQQuestion;
  selectedAnswer: number | undefined;
  onAnswerChange: (questionId: string, value: number) => void;
}

const MCQQuestionComponent: React.FC<MCQQuestionComponentProps> = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <p className="text-lg">{question.content}</p>
      </div>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
            <input
              type="radio"
              name={question.id}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onAnswerChange(question.id, index)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-900">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQQuestionComponent;
