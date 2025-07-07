'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Code } from 'lucide-react';

interface ProjectData {
  id?: string;
  title?: string;
  description?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  isOngoing?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
  teamSize?: string;
  role?: string;
}

interface ProjectFormProps {
  initialData?: ProjectData;
  onSave: (data: ProjectData) => void;
  onCancel: () => void;
}

export default function ProjectForm({ initialData = {}, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectData>({
    title: initialData.title || '',
    description: initialData.description || '',
    technologies: initialData.technologies || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
    isOngoing: initialData.isOngoing || false,
    githubUrl: initialData.githubUrl || '',
    liveUrl: initialData.liveUrl || '',
    highlights: initialData.highlights || [''],
    teamSize: initialData.teamSize || '',
    role: initialData.role || '',
    ...initialData
  });

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), '']
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    const updated = [...(formData.highlights || [])];
    updated[index] = value;
    setFormData(prev => ({ ...prev, highlights: updated }));
  };

  const removeHighlight = (index: number) => {
    if ((formData.highlights || []).length > 1) {
      setFormData(prev => ({
        ...prev,
        highlights: (prev.highlights || []).filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const newProject = await response.json();
        onSave(newProject);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Code className="w-5 h-5" />
          {initialData.id ? 'Edit Project' : 'Add New Project'}
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
          <label className="block text-sm font-medium mb-1">Project Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., E-commerce Platform"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Brief description of what the project does..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Technologies Used *</label>
          <input
            type="text"
            required
            value={formData.technologies}
            onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., React, Node.js, PostgreSQL, Docker"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="text"
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
              placeholder="e.g., Mar 2023"
              disabled={formData.isOngoing}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isOngoing"
            checked={formData.isOngoing}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              isOngoing: e.target.checked,
              endDate: e.target.checked ? '' : prev.endDate
            }))}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="isOngoing" className="text-sm font-medium">
            This is an ongoing project
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/username/project"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Live Demo URL</label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://myproject.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Team Size</label>
            <input
              type="text"
              value={formData.teamSize}
              onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3 developers, Solo project"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Your Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Full-stack Developer, Team Lead"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Key Highlights</label>
          {(formData.highlights || []).map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Achieved 99.9% uptime with optimized database queries"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                disabled={(formData.highlights || []).length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="mt-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Highlight
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
            Save Project
          </button>
        </div>
      </form>
    </div>
  );
} 