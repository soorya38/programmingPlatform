import React from 'react';
import { SubjectiveQuestion } from '../types';

interface SubjectiveQuestionComponentProps {
  question: SubjectiveQuestion;
  answer: string | undefined;
  onAnswerChange: (questionId: string, value: string) => void;
}

const SubjectiveQuestionComponent: React.FC<SubjectiveQuestionComponentProps> = ({ question, answer, onAnswerChange }) => {
  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <p className="text-lg">{question.content}</p>
      </div>
      <textarea
        value={answer || ''}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        rows={8}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Type your answer here..."
      />
    </div>
  );
};

export default SubjectiveQuestionComponent;
