import React from 'react';
import { Search, Eye } from 'lucide-react';
import { Question } from '../types';
import QuestionPreview from './QuestionPreview';

interface QuestionSelectorProps {
  questions: Question[];
  selectedQuestions: Question[];
  onToggleQuestion: (question: Question) => void;
}

export default function QuestionSelector({ 
  questions, 
  selectedQuestions, 
  onToggleQuestion 
}: QuestionSelectorProps) {
  const [search, setSearch] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState<string>('all');
  const [previewQuestion, setPreviewQuestion] = React.useState<Question | null>(null);

  const subjects = React.useMemo(() => {
    const subjectSet = new Set(questions.map(q => q.subject));
    return ['all', ...Array.from(subjectSet)];
  }, [questions]);

  const filteredQuestions = React.useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.content.toLowerCase().includes(search.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }, [questions, search, selectedSubject]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
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
          className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded-md divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {filteredQuestions.map((question) => {
          const isSelected = selectedQuestions.some(q => q.id === question.id);
          
          return (
            <div
              key={question.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                isSelected ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {question.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">{question.points} points</span>
                  </div>
                  <p className="text-gray-900 mb-1">{question.content}</p>
                  <p className="text-sm text-gray-500">Subject: {question.subject}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setPreviewQuestion(question)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleQuestion(question)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {previewQuestion && (
        <QuestionPreview
          question={previewQuestion}
          onClose={() => setPreviewQuestion(null)}
        />
      )}
    </div>
  );
}