import { Trophy, Code, Award, BookOpen, Users } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Projects', value: '12', icon: Code },
    { name: 'Achievements', value: '8', icon: Trophy },
    { name: 'Certifications', value: '5', icon: Award },
    { name: 'Mock Interviews', value: '3', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, John!</h2>
            <p className="text-gray-500">Computer Science • Year 3</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Completed AWS Cloud Practitioner Certification
                </p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Code className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Added new project: E-commerce Platform
                </p>
                <p className="text-sm text-gray-500">5 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Mock Interview with Tech Lead
                </p>
                <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Trophy className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  University Hackathon
                </p>
                <p className="text-sm text-gray-500">Next week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}