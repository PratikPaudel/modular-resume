'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, GraduationCap } from 'lucide-react';

interface EducationData {
  id?: string;
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyEnrolled?: boolean;
  gpa?: string;
  honors?: string;
  relevantCoursework?: string;
  activities?: string;
}

interface EducationFormProps {
  initialData?: EducationData;
  onSave: (data: EducationData) => void;
  onCancel: () => void;
}

export default function EducationForm({ initialData = {}, onSave, onCancel }: EducationFormProps) {
  const [formData, setFormData] = useState<EducationData>({
    institution: initialData.institution || '',
    degree: initialData.degree || '',
    fieldOfStudy: initialData.fieldOfStudy || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    isCurrentlyEnrolled: initialData.isCurrentlyEnrolled || false,
    gpa: initialData.gpa || '',
    honors: initialData.honors || '',
    relevantCoursework: initialData.relevantCoursework || '',
    activities: initialData.activities || '',
    ...initialData
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const newEducation = await response.json();
        onSave(newEducation);
      }
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          {initialData.id ? 'Edit Education' : 'Add New Education'}
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
          <label className="block text-sm font-medium mb-1">Institution *</label>
          <input
            type="text"
            required
            value={formData.institution}
            onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Stanford University"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Degree *</label>
            <input
              type="text"
              required
              value={formData.degree}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Bachelor of Science"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Field of Study *</label>
            <input
              type="text"
              required
              value={formData.fieldOfStudy}
              onChange={(e) => setFormData(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Computer Science"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Sep 2020"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="text"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., May 2024"
              disabled={formData.isCurrentlyEnrolled}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCurrentlyEnrolled"
            checked={formData.isCurrentlyEnrolled}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              isCurrentlyEnrolled: e.target.checked,
              endDate: e.target.checked ? '' : prev.endDate
            }))}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="isCurrentlyEnrolled" className="text-sm font-medium">
            Currently enrolled
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">GPA</label>
            <input
              type="text"
              value={formData.gpa}
              onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3.8/4.0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Honors & Awards</label>
            <input
              type="text"
              value={formData.honors}
              onChange={(e) => setFormData(prev => ({ ...prev, honors: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Summa Cum Laude, Dean's List"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Relevant Coursework</label>
          <textarea
            value={formData.relevantCoursework}
            onChange={(e) => setFormData(prev => ({ ...prev, relevantCoursework: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="e.g., Data Structures, Algorithms, Database Systems, Machine Learning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Activities & Organizations</label>
          <textarea
            value={formData.activities}
            onChange={(e) => setFormData(prev => ({ ...prev, activities: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="e.g., Computer Science Club, Hackathon Organizer"
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
            Save Education
          </button>
        </div>
      </form>
    </div>
  );
} 