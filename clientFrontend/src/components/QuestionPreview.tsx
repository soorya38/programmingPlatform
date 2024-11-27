import React from 'react';
import { X } from 'lucide-react';
import { Question, MCQQuestion, CodingQuestion } from '../types';

interface QuestionPreviewProps {
  question: Question;
  onClose: () => void;
}

export default function QuestionPreview({ question, onClose }: QuestionPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
                {question.type.toUpperCase()}
              </span>
              <h2 className="text-xl font-semibold text-gray-900">{question.subject}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Question</h3>
              <p className="text-gray-700">{question.content}</p>
            </div>

            {question.type === 'mcq' && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Options</h3>
                <ul className="space-y-2">
                  {(question as MCQQuestion).options.map((option, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {question.type === 'coding' && (
              <>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Starter Code</h3>
                  <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                    <code>{(question as CodingQuestion).starterCode || 'No starter code provided'}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Test Cases</h3>
                  <div className="space-y-3">
                    {(question as CodingQuestion).testCases?.filter(tc => !tc.hidden).map((tc, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Input:</p>
                            <pre className="text-sm">{tc.input}</pre>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Expected Output:</p>
                            <pre className="text-sm">{tc.output}</pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">Points: {question.points}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}