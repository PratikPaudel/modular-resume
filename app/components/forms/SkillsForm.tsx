'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Award } from 'lucide-react';

interface SkillData {
  id?: string;
  category?: string;
  skills?: string[];
  proficiencyLevel?: string;
  yearsOfExperience?: string;
}

interface SkillsFormProps {
  initialData?: SkillData;
  onSave: (data: SkillData) => void;
  onCancel: () => void;
}

export default function SkillsForm({ initialData = {}, onSave, onCancel }: SkillsFormProps) {
  const [formData, setFormData] = useState<SkillData>({
    category: initialData.category || '',
    skills: initialData.skills || [''],
    proficiencyLevel: initialData.proficiencyLevel || 'intermediate',
    yearsOfExperience: initialData.yearsOfExperience || '',
    ...initialData
  });

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...(prev.skills || []), '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...(formData.skills || [])];
    updated[index] = value;
    setFormData(prev => ({ ...prev, skills: updated }));
  };

  const removeSkill = (index: number) => {
    if ((formData.skills || []).length > 1) {
      setFormData(prev => ({
        ...prev,
        skills: (prev.skills || []).filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const newSkills = await response.json();
        // The API now returns an array of skills, so we pass the first one for compatibility
        onSave(newSkills[0] || newSkills);
      }
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award className="w-5 h-5" />
          {initialData.id ? 'Edit Skills' : 'Add New Skills'}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Programming Languages, Frameworks, Tools"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Proficiency Level</label>
          <select
            value={formData.proficiencyLevel}
            onChange={(e) => setFormData(prev => ({ ...prev, proficiencyLevel: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Years of Experience</label>
          <input
            type="text"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 3 years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          {(formData.skills || []).map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., React, TypeScript, Node.js"
              />
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                disabled={(formData.skills || []).length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Skills
          </button>
        </div>
      </form>
    </div>
  );
} 