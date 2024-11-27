import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { MCQQuestion, MCQresult } from '../types';

interface MCQResultProps {
  question: MCQQuestion;
  result: MCQresult;
}

export default function MCQResult({ question, result }: MCQResultProps) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-medium text-gray-900">
            {question.content}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Points: {question.points}
          </p>
        </div>
        {result.isCorrect ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${
              index === question.correctOption
                ? 'border-green-200 bg-green-50'
                : index === result.selectedOption && !result.isCorrect
                ? 'border-red-200 bg-red-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`${
                  index === question.correctOption
                    ? 'text-green-700'
                    : index === result.selectedOption && !result.isCorrect
                    ? 'text-red-700'
                    : 'text-gray-700'
                }`}
              >
                {option}
              </span>
              {index === question.correctOption && (
                <span className="text-sm text-green-600">Correct Answer</span>
              )}
              {index === result.selectedOption && !result.isCorrect && (
                <span className="text-sm text-red-600">Your Answer</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm font-medium">
        {result.isCorrect ? (
          <p className="text-green-600">
            Correct! You earned {result.points} points
          </p>
        ) : (
          <p className="text-red-600">
            Incorrect. The correct answer was option{' '}
            {question.correctOption + 1}
          </p>
        )}
      </div>
    </div>
  );
}
