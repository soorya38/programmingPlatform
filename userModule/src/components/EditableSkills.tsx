import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface EditableSkillsProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
  isEditing: boolean;
  category: string;
  className?: string;
}

export default function EditableSkills({
  skills,
  onUpdate,
  isEditing,
  category,
  className = ''
}: EditableSkillsProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      onUpdate([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdate(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1.5 inline-flex items-center"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
      </div>
      
      {isEditing && (
        <form onSubmit={handleAddSkill} className="mt-2 flex items-center space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder={`Add ${category}`}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center p-2 text-indigo-600 hover:text-indigo-700"
            aria-label={`Add ${category}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>
      )}
    </div>
  );
}