import React from 'react';
import { Search, UserPlus, UserMinus, Users } from 'lucide-react';
import { Student } from '../types';

interface StudentSelectorProps {
  students: Student[];
  selectedStudents: Student[];
  onToggleStudent: (student: Student) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export default function StudentSelector({
  students,
  selectedStudents,
  onToggleStudent,
  onSelectAll,
  onDeselectAll
}: StudentSelectorProps) {
  const [search, setSearch] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('all');

  const departments = React.useMemo(() => {
    const deptSet = new Set(students.map(s => s.department));
    return ['all', ...Array.from(deptSet)];
  }, [students]);

  const filteredStudents = React.useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.fullName.toLowerCase().includes(search.toLowerCase()) ||
                          s.email.toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || s.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [students, search, selectedDepartment]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium text-gray-900">Select Students</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSelectAll}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Select All
          </button>
          <button
            onClick={onDeselectAll}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <UserMinus className="w-4 h-4 mr-1" />
            Deselect All
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept === 'all' ? 'All Departments' : dept}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded-md divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
        {filteredStudents.map((student) => {
          const isSelected = selectedStudents.some(s => s.id === student.id);
          
          return (
            <div
              key={student.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                isSelected ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                  <p className="text-xs text-gray-500 mt-1">{student.department}</p>
                </div>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleStudent(student)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
            </div>
          );
        })}

        {filteredStudents.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No students found matching your criteria
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        {selectedStudents.length} students selected
      </div>
    </div>
  );
}