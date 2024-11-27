import { Test, Question } from './types';

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'mcq',
    content: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctOption: 2,
    points: 1,
    subject: 'Geography'
  },
  {
    id: '2',
    type: 'subjective',
    content: 'Explain the process of photosynthesis.',
    points: 5,
    subject: 'Biology',
    expectedWordCount: 200
  },
  {
    id: '3',
    type: 'coding',
    content: 'Write a function that returns the factorial of a number.',
    points: 10,
    subject: 'Programming',
    starterCode: 'function factorial(n) {\n  // Your code here\n}',
    testCases: [
      { input: '5', output: '120', hidden: false },
      { input: '0', output: '1', hidden: false },
      { input: '10', output: '3628800', hidden: true }
    ]
  }
];

export const mockTest: Test = {
  id: 'test-123',
  title: 'Sample Mixed Test',
  description: 'This is a sample test with different types of questions.',
  startTime: new Date(),
  endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  duration: 120, // 2 hours in minutes
  questions: mockQuestions,
  allowedStudents: ['student-1', 'student-2']
};