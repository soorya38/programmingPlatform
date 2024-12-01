import { Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Projects', href: '/projects' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Interview Prep', href: '/interview-prep' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="font-semibold text-xl">StudentHub</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-semibold ${
                location.pathname === item.href
                  ? 'text-indigo-600'
                  : 'text-gray-900 hover:text-indigo-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/settings"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Settings
          </Link>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === item.href
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/settings"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-indigo-50 hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}