import React from 'react';
import { CodingQuestion } from '../types';

interface CodingQuestionComponentProps {
  question: CodingQuestion;
  code: string | undefined;
  onAnswerChange: (questionId: string, value: string) => void;
}

const CodingQuestionComponent: React.FC<CodingQuestionComponentProps> = ({ question, code, onAnswerChange }) => {
  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <p className="text-lg">{question.content}</p>
      </div>
      <textarea
        value={code || ''}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        rows={12}
        className="w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Write your code here..."
      />
    </div>
  );
};

export default CodingQuestionComponent;
