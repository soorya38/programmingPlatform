import React from 'react';
import { Timer } from 'lucide-react';

interface TestHeaderProps {
  title: string;
}

export default function TestHeader({ title }: TestHeaderProps) {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Time remaining shown above each question</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}