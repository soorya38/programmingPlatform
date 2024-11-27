import React from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Question, Student } from '../types';
import QuestionSelector from './QuestionSelector';
import StudentSelector from './StudentSelector';

interface TestSchedulerProps {
  onSchedule: (data: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    questions: Question[];
    allowedStudents: Student[];
  }) => void;
  onBack: () => void;
  questions: Question[];
}

// Mock student data - in a real app, this would come from your backend
const mockStudents: Student[] = [
  { id: '1', fullName: 'John Doe', email: 'john@university.edu', department: 'Computer Science' },
  { id: '2', fullName: 'Jane Smith', email: 'jane@university.edu', department: 'Computer Science' },
  { id: '3', fullName: 'Alice Johnson', email: 'alice@university.edu', department: 'Mathematics' },
  { id: '4', fullName: 'Bob Wilson', email: 'bob@university.edu', department: 'Mathematics' },
  { id: '5', fullName: 'Carol Brown', email: 'carol@university.edu', department: 'Physics' },
];

export default function TestScheduler({ onSchedule, onBack, questions }: TestSchedulerProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [duration, setDuration] = React.useState(60);
  const [selectedQuestions, setSelectedQuestions] = React.useState<Question[]>([]);
  const [selectedStudents, setSelectedStudents] = React.useState<Student[]>([]);
  const [currentStep, setCurrentStep] = React.useState<'details' | 'questions' | 'students'>('details');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(start.getTime() + duration * 60000);
    
    onSchedule({
      title,
      description,
      startTime: start,
      endTime: end,
      duration,
      questions: selectedQuestions,
      allowedStudents: selectedStudents,
    });
  };

  const toggleQuestion = (question: Question) => {
    setSelectedQuestions(prev => 
      prev.some(q => q.id === question.id)
        ? prev.filter(q => q.id !== question.id)
        : [...prev, question]
    );
  };

  const toggleStudent = (student: Student) => {
    setSelectedStudents(prev =>
      prev.some(s => s.id === student.id)
        ? prev.filter(s => s.id !== student.id)
        : [...prev, student]
    );
  };

  const selectAllStudents = () => {
    setSelectedStudents(mockStudents);
  };

  const deselectAllStudents = () => {
    setSelectedStudents([]);
  };

  const totalPoints = selectedQuestions.reduce((sum, q) => sum + q.points, 0);
  const today = new Date().toISOString().split('T')[0];

  const renderStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Test Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 'questions':
        return (
          <div>
            <QuestionSelector
              questions={questions}
              selectedQuestions={selectedQuestions}
              onToggleQuestion={toggleQuestion}
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Selected Questions: {selectedQuestions.length}</span>
              <span>Total Points: {totalPoints}</span>
            </div>
          </div>
        );

      case 'students':
        return (
          <StudentSelector
            students={mockStudents}
            selectedStudents={selectedStudents}
            onToggleStudent={toggleStudent}
            onSelectAll={selectAllStudents}
            onDeselectAll={deselectAllStudents}
          />
        );
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'details':
        return title && description && startDate && startTime && duration;
      case 'questions':
        return selectedQuestions.length > 0;
      case 'students':
        return selectedStudents.length > 0;
    }
  };

  const getStepNumber = (step: 'details' | 'questions' | 'students') => {
    const steps = ['details', 'questions', 'students'];
    return steps.indexOf(step) + 1;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Calendar className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Schedule Test</h2>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {(['details', 'questions', 'students'] as const).map((step) => (
            <div
              key={step}
              className={`flex items-center ${
                getStepNumber(step) < getStepNumber(currentStep)
                  ? 'text-indigo-600'
                  : getStepNumber(step) === getStepNumber(currentStep)
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  getStepNumber(step) <= getStepNumber(currentStep)
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300'
                }`}
              >
                {getStepNumber(step)}
              </div>
              <span className="ml-2 text-sm font-medium">
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </span>
              {getStepNumber(step) < 3 && (
                <div className="w-full h-0.5 mx-4 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => {
              if (currentStep === 'questions') setCurrentStep('details');
              if (currentStep === 'students') setCurrentStep('questions');
            }}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
              currentStep === 'details' ? 'invisible' : ''
            }`}
          >
            Previous
          </button>
          
          {currentStep === 'students' ? (
            <button
              type="submit"
              disabled={!canProceed()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Test
            </button>
          ) : (
            <button
              type="button"
              disabled={!canProceed()}
              onClick={() => {
                if (currentStep === 'details') setCurrentStep('questions');
                if (currentStep === 'questions') setCurrentStep('students');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}