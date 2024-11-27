import React from 'react';
import { PlusCircle, MinusCircle, Code, AlignLeft, ListChecks, ArrowLeft } from 'lucide-react';
import { QuestionType } from '../types';
import TestCase from './TestCase';

interface TestCaseType {
  input: string;
  output: string;
  hidden: boolean;
}

interface QuestionFormProps {
  type: QuestionType;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export default function QuestionForm({ type, onSubmit, onBack }: QuestionFormProps) {
  const [options, setOptions] = React.useState(['']);
  const [correctOption, setCorrectOption] = React.useState<number>(0);
  const [content, setContent] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [points, setPoints] = React.useState(1);
  const [starterCode, setStarterCode] = React.useState('');
  const [testCases, setTestCases] = React.useState<TestCaseType[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      content,
      subject,
      points,
      ...(type === 'mcq' && { options, correctOption }),
      ...(type === 'coding' && { 
        starterCode,
        testCases
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {type === 'mcq' && <ListChecks className="w-6 h-6 text-indigo-600" />}
        {type === 'subjective' && <AlignLeft className="w-6 h-6 text-indigo-600" />}
        {type === 'coding' && <Code className="w-6 h-6 text-indigo-600" />}
        <h2 className="text-xl font-semibold text-gray-800">
          {type === 'mcq' && 'Multiple Choice Question'}
          {type === 'subjective' && 'Subjective Question'}
          {type === 'coding' && 'Coding Challenge'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {type === 'mcq' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Options</label>
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOption === index}
                    onChange={() => setCorrectOption(index)}
                    className="mt-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  {index === options.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setOptions([...options, ''])}
                      className="p-2 text-indigo-600 hover:text-indigo-700"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setOptions(options.filter((_, i) => i !== index));
                        if (correctOption === index) {
                          setCorrectOption(0);
                        }
                      }}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <p className="text-sm text-gray-500 mt-1">
                Select the radio button next to the correct option
              </p>
            </div>
          </div>
        )}

        {type === 'coding' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Starter Code</label>
              <textarea
                value={starterCode}
                onChange={(e) => setStarterCode(e.target.value)}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
                placeholder="// Provide any starter code here..."
              />
            </div>
            <TestCase testCases={testCases} onChange={setTestCases} />
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Points</label>
          <input
            type="number"
            min="1"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Question
      </button>
    </form>
  );
}