import React from 'react';
import { Question } from '../types';

interface QuestionNavigationProps {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, any>;
  onQuestionSelect: (index: number) => void;
}

export default function QuestionNavigation({
  questions,
  currentIndex,
  answers,
  onQuestionSelect
}: QuestionNavigationProps) {
  return (
    <div className="flex gap-2">
      {questions.map((_, index) => {
        const isAnswered = answers[questions[index].id] !== undefined;
        const isCurrent = currentIndex === index;

        return (
          <button
            key={index}
            onClick={() => onQuestionSelect(index)}
            className={`w-8 h-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isCurrent
                ? 'bg-indigo-600 text-white'
                : isAnswered
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}