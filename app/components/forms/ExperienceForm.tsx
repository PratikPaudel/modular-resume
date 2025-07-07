'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Briefcase } from 'lucide-react';

interface ExperienceData {
  id?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrentJob?: boolean;
  description?: string;
  achievements?: string[];
  skills?: string;
}

interface ExperienceFormProps {
  initialData?: ExperienceData;
  onSave: (data: ExperienceData) => void;
  onCancel: () => void;
}

export default function ExperienceForm({ initialData = {}, onSave, onCancel }: ExperienceFormProps) {
  const [formData, setFormData] = useState<ExperienceData>({
    jobTitle: initialData.jobTitle || '',
    company: initialData.company || '',
    location: initialData.location || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    isCurrentJob: initialData.isCurrentJob || false,
    description: initialData.description || '',
    achievements: initialData.achievements || [''],
    skills: initialData.skills || '',
    ...initialData
  });

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), '']
    }));
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...(formData.achievements || [])];
    updated[index] = value;
    setFormData(prev => ({ ...prev, achievements: updated }));
  };

  const removeAchievement = (index: number) => {
    if ((formData.achievements || []).length > 1) {
      setFormData(prev => ({
        ...prev,
        achievements: (prev.achievements || []).filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const newExperience = await response.json();
        onSave(newExperience);
      }
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          {initialData.id ? 'Edit Experience' : 'Add New Experience'}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Job Title *</label>
            <input
              type="text"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Google"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Start Date *</label>
            <input
              type="text"
              required
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Jan 2023"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="text"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Dec 2023"
              disabled={formData.isCurrentJob}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCurrentJob"
            checked={formData.isCurrentJob}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              isCurrentJob: e.target.checked,
              endDate: e.target.checked ? '' : prev.endDate
            }))}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="isCurrentJob" className="text-sm font-medium">
            This is my current job
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Brief description of your role and responsibilities..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Achievements</label>
          {(formData.achievements || []).map((achievement, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Increased team productivity by 40% through process improvements"
              />
              <button
                type="button"
                onClick={() => removeAchievement(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                disabled={(formData.achievements || []).length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAchievement}
            className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Achievement
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Skills Used</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., React, Node.js, PostgreSQL, Docker"
          />
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
            Save Experience
          </button>
        </div>
      </form>
    </div>
  );
} 