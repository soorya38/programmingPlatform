import React from 'react';
import { Plus, ListChecks, AlignLeft, Code, ClipboardList, UserCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import QuestionForm from './components/QuestionForm';
import TestScheduler from './components/TestScheduler';
import QuestionBank from './components/QuestionBank';
import TestList from './components/TestList';
import TestAttempt from './components/TestAttempt';
import UserProfile, { UserData } from './components/UserProfile';
import { Question, QuestionType, Test } from './types';
import * as api from './api';

function App() {
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = React.useState<QuestionType | null>(null);
  const [showScheduler, setShowScheduler] = React.useState(false);
  const [showTests, setShowTests] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [selectedTest, setSelectedTest] = React.useState<Test | null>(null);

  // Check backend health on mount
  React.useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const health = await api.checkHealth();
        toast.success('Connected to backend successfully');
        console.log('Backend health check passed:', health);
      } catch (error) {
        toast.error('Failed to connect to backend');
        console.error('Backend health check failed:', error);
      }
    };
    checkBackendHealth();
  }, []);

  // Queries with error handling and loading states
  const { 
    data: questions = [], 
    isLoading: isLoadingQuestions, 
    error: questionsError 
  } = useQuery<Question[]>('questions', api.getQuestions, {
    onError: (error: any) => {
      
      toast.error('Failed to fetch questions');
      console.error('Failed to fetch questions:', error);
    },
  }
);

  const { 
    data: tests = [], 
    isLoading: isLoadingTests, 
    error: testsError 
  } = useQuery<Test[]>('tests', api.getTests, {
    onError: (error: any) => {
      toast.error('Failed to fetch tests');
      console.error('Failed to fetch tests:', error);
    },
  });

  // Mutations with success/error handling
  const createQuestionMutation = useMutation(api.createQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      setSelectedType(null);
      toast.success('Question created successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to create question');
      console.error('Failed to create question:', error);
    },
  });

  const createTestMutation = useMutation(api.createTest, {
    onSuccess: () => {
      queryClient.invalidateQueries('tests');
      setShowScheduler(false);
      toast.success('Test scheduled successfully');
    },
    onError: (error: any) => {
      toast.error('Failed to schedule test');
      console.error('Failed to create test:', error);
    },
  });

  const submitTestMutation = useMutation(
    (data: { testId: string; answers: Record<string, any> }) =>
      api.submitTest(data.testId, data.answers),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tests');
        setSelectedTest(null);
        toast.success('Test submitted successfully');
      },
      onError: (error: any) => {
        toast.error('Failed to submit test');
        console.error('Failed to submit test:', error);
      },
    }
  );

  const handleQuestionSubmit = (data: any) => {
    createQuestionMutation.mutate(data);
  };

  const handleTestSchedule = (data: any) => {
    createTestMutation.mutate(data);
  };

  const handleTestSubmit = (answers: Record<string, any>) => {
    if (selectedTest) {
      submitTestMutation.mutate({
        testId: selectedTest.id,
        answers,
      });
    }
  };

  const handleBack = () => {
    setSelectedType(null);
    setShowScheduler(false);
    setShowTests(false);
    setShowProfile(false);
    setSelectedTest(null);
  };

  if (selectedTest) {
    return (
      <TestAttempt
        test={selectedTest}
        onSubmit={handleTestSubmit}
        onExit={handleBack}
      />
    );
  }

  if (isLoadingQuestions || isLoadingTests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (questionsError || testsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">Please check your connection and try again</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Question Management System</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowProfile(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserCircle className="w-5 h-5 mr-2" />
                Create Profile
              </button>
              <button
                onClick={() => setShowTests(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                View Tests
              </button>
              <button
                onClick={() => setShowScheduler(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!Array.isArray(questions) || questions.length === 0}
              >
                <Plus className="w-5 h-5 mr-2" />
                Schedule Test
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {!selectedType && !showScheduler && !showTests && !showProfile && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Create New Question</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => setSelectedType('mcq')}
                      className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                    >
                      <ListChecks className="w-6 h-6 text-indigo-600" />
                      <span className="font-medium">Multiple Choice Question</span>
                    </button>
                    <button
                      onClick={() => setSelectedType('subjective')}
                      className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                    >
                      <AlignLeft className="w-6 h-6 text-indigo-600" />
                      <span className="font-medium">Subjective Question</span>
                    </button>
                    <button
                      onClick={() => setSelectedType('coding')}
                      className="flex items-center justify-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                    >
                      <Code className="w-6 h-6 text-indigo-600" />
                      <span className="font-medium">Coding Challenge</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedType && (
                <QuestionForm 
                  type={selectedType} 
                  onSubmit={handleQuestionSubmit}
                  onBack={handleBack}
                />
              )}

              {showScheduler && (
                <TestScheduler 
                  questions={questions}
                  onSchedule={handleTestSchedule}
                  onBack={handleBack}
                />
              )}

              {showTests && (
                <TestList 
                  tests={tests}
                  onViewTest={setSelectedTest}
                  onBack={handleBack}
                />
              )}

              {showProfile && (
                <UserProfile
                  onSave={(data: UserData) => {
                    console.log('Save profile:', data);
                    toast.success('Profile saved successfully');
                    setShowProfile(false);
                  }}
                  onBack={handleBack}
                />
              )}
            </div>

            <QuestionBank
              questions={questions}
              onSelect={(question) => console.log('Selected question:', question)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;