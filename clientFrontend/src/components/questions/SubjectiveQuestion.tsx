import React from 'react';
import { SubjectiveQuestion as SubjectiveQuestionType } from '../../types';

interface SubjectiveQuestionProps {
  question: SubjectiveQuestionType;
  answer?: string;
  onChange: (value: string) => void;
}

export default function SubjectiveQuestion({
  question,
  answer = '',
  onChange
}: SubjectiveQuestionProps) {
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <p className="text-lg">{question.content}</p>
        {question.expectedWordCount && (
          <p className="text-sm text-gray-500">
            Expected word count: {question.expectedWordCount}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <textarea
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Type your answer here..."
        />
        
        <div className="flex justify-end">
          <span className={`text-sm ${
            question.expectedWordCount && wordCount > question.expectedWordCount
              ? 'text-red-500'
              : 'text-gray-500'
          }`}>
            Words: {wordCount}
            {question.expectedWordCount && ` / ${question.expectedWordCount}`}
          </span>
        </div>
      </div>
    </div>
  );
}