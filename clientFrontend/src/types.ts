export type QuestionType = 'mcq' | 'subjective' | 'coding';

export interface TestCase {
  input: string;
  output: string;
  hidden: boolean;
}

interface BaseQuestion {
  id: string;
  type: QuestionType;
  content: string;
  points: number;
  subject: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
  correctOption: number;
}

export interface SubjectiveQuestion extends BaseQuestion {
  type: 'subjective';
  expectedWordCount?: number;
  modelAnswer?: string;
}

export interface CodingQuestion extends BaseQuestion {
  type: 'coding';
  starterCode?: string;
  testCases: TestCase[];
}

export type Question = MCQQuestion | SubjectiveQuestion | CodingQuestion;

export interface Test {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  questions: Question[];
  allowedStudents: string[];
}

export interface TestResult {
  questionId: string;
  points: number;
  feedback?: string;
}