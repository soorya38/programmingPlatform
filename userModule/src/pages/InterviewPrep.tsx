import { useState } from 'react';
import { Users, BookOpen, Brain, MessageSquare } from 'lucide-react';

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const mockInterviews = [
    {
      id: 1,
      company: 'Tech Corp',
      role: 'Full Stack Developer',
      date: '2024-03-25',
      time: '14:00',
      type: 'Technical',
      status: 'upcoming',
    },
    {
      id: 2,
      company: 'Innovation Labs',
      role: 'Frontend Developer',
      date: '2024-03-20',
      time: '15:30',
      type: 'HR',
      status: 'completed',
      feedback: 'Good communication skills, needs improvement in system design concepts.',
      rating: 4,
    },
  ];

  const resources = [
    {
      title: 'Data Structures & Algorithms',
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
      progress: 75,
    },
    {
      title: 'System Design',
      topics: ['Scalability', 'Database Design', 'API Design'],
      progress: 60,
    },
    {
      title: 'Behavioral Questions',
      topics: ['Leadership', 'Team Collaboration', 'Problem Solving'],
      progress: 90,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mock Interviews</h2>
        
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`${
                activeTab === 'completed'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
            >
              Completed
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {mockInterviews
            .filter((interview) => interview.status === activeTab)
            .map((interview) => (
              <div
                key={interview.id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {interview.company}
                    </h3>
                    <p className="text-sm text-gray-500">{interview.role}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {interview.type}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(interview.date).toLocaleDateString()} at {interview.time}
                </div>
                {interview.status === 'completed' && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600">{interview.feedback}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-2">
                        Rating:
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < interview.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Preparation Resources</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="border border-gray-200 rounded-lg p-4"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {resource.title}
              </h3>
              <div className="space-y-2">
                {resource.topics.map((topic) => (
                  <p key={topic} className="text-sm text-gray-600">
                    • {topic}
                  </p>
                ))}
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{resource.progress}%</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${resource.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}