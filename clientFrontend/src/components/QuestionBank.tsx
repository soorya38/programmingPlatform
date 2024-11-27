import React from 'react';
import { Book, Search, InboxIcon } from 'lucide-react';
import { Question } from '../types';

interface QuestionBankProps {
  questions: Question[];
  onSelect: (question: Question) => void;
}

export default function QuestionBank({ questions = [], onSelect }: QuestionBankProps) {
  const [search, setSearch] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState<string>('all');

  const subjects = React.useMemo(() => {
    if (!Array.isArray(questions)) return ['all'];
    const subjectSet = new Set(questions.map(q => q.subject));
    return ['all', ...Array.from(subjectSet)];
  }, [questions]);

  const filteredQuestions = React.useMemo(() => {
    if (!Array.isArray(questions)) return [];
    return questions.filter(q => {
      const matchesSearch = q.content.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [questions, search, selectedSubject]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Book className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">Question Bank</h2>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={subjects.length <= 1}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!Array.isArray(questions) || questions.length === 0 ? (
        <div className="p-12 text-center">
          <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No questions</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new question.</p>
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="p-12 text-center">
          <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No matching questions</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelect(question)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {question.type.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">{question.points} points</span>
              </div>
              <p className="text-gray-900 mb-2">{question.content}</p>
              <p className="text-sm text-gray-500">Subject: {question.subject}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}