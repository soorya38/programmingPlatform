
import { Calendar, Clock, Users, ArrowLeft, InboxIcon } from 'lucide-react';
import { Test } from '../types';

interface TestListProps {
  tests: Test[];
  onViewTest: (test: Test) => void;
  onBack: () => void;
}

export default function TestList({ tests, onViewTest, onBack }: TestListProps) {
  console.log(tests)
  const getTestStatus = (test: Test) => {
    const now = new Date();
    if (now < test.startTime) return 'scheduled';
    if (now >= test.startTime && now <= test.endTime) return 'in-progress';
    return 'completed';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Scheduled Tests
          </h2>
        </div>
      </div>

      {tests.length === 0 ? (
        <div className="p-12 text-center">
          <InboxIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No tests scheduled
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by scheduling a new test.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {tests.map((test) => {
            const status = getTestStatus(test);
            const statusColors = {
              scheduled: 'bg-yellow-100 text-yellow-800',
              'in-progress': 'bg-green-100 text-green-800',
              completed: 'bg-gray-100 text-gray-800',
            };

            return (
              <div
                key={test.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewTest(test)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {test.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {test.description}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Start: {formatDate(test.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {test.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {/* Handle null or undefined safely */}
                    <span>{test.questions?.length ?? 0} Questions</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
