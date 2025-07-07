'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';
import { supabase } from '../../lib/supabaseClient';
import ResumePreview from './components/editor/preview/ResumePreview';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Download, User, GraduationCap, Briefcase, FolderOpen, Code2, Trophy, Plus, GripVertical, ChevronDown 
} from 'lucide-react';

// Configuration for each resume section
const SECTION_CONFIG = [
  { key: 'personalInfo', label: 'Personal Info', icon: User },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'skills', label: 'Technical Skills', icon: Code2 },
  { key: 'leadership', label: 'Leadership', icon: Trophy },
];

// A new, integrated component for a single, sortable, and collapsible editor panel.
// This replaces the need for separate EditorPanel, EditorSectionStub, and PersonalInfoEditor components.
function SortableEditorPanel({ 
  id, 
  section, 
  resumeData, 
  setResumeData,
  isExpanded, 
  onToggle 
}: { 
  id: string, 
  section: typeof SECTION_CONFIG[0], 
  resumeData: ResumeData, 
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>,
  isExpanded: boolean, 
  onToggle: () => void 
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => prev ? {
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    } : null);
  };
  
  const renderPanelContent = () => {
    switch(id) {
      case 'personalInfo':
        return (
          <div className="space-y-3">
            <input type="text" name="name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} placeholder="Full Name" className="w-full p-2 border rounded text-sm"/>
            <input type="text" name="location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} placeholder="Location" className="w-full p-2 border rounded text-sm"/>
            <input type="text" name="phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="Phone" className="w-full p-2 border rounded text-sm"/>
            <input type="email" name="email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="Email" className="w-full p-2 border rounded text-sm"/>
            <input type="text" name="linkedin" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} placeholder="LinkedIn URL" className="w-full p-2 border rounded text-sm"/>
            <input type="text" name="github" value={resumeData.personalInfo.github} onChange={handlePersonalInfoChange} placeholder="GitHub URL" className="w-full p-2 border rounded text-sm"/>
          </div>
        );
      // Add cases for other sections here to render their specific forms
      // For now, they show a placeholder.
      default:
        return <p className="text-sm text-gray-500">Editing form for {section.label} will be here.</p>;
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div 
        className="flex items-center justify-between p-3 border-b bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab p-1 touch-none">
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
          <section.icon className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-sm text-gray-800 uppercase tracking-wider">{section.label}</h3>
        </div>
        <button onClick={onToggle} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
          <ChevronDown size={20} className={`transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isExpanded && (
        <div className="p-4">
          {renderPanelContent()}
        </div>
      )}
    </div>
  );
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}

const ResumeEditorPage = () => {
  const [sectionOrder, setSectionOrder] = useState(SECTION_CONFIG.map(s => s.key));
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personalInfo: true, // Start with personal info expanded
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const [expRes, projRes, eduRes, skillsRes] = await Promise.all([
        fetch('/api/experience'), fetch('/api/project'), fetch('/api/education'), fetch('/api/skills'),
      ]);

      const experience = expRes.ok ? await expRes.json() : [];
      const projects = projRes.ok ? await projRes.json() : [];
      const education = eduRes.ok ? await eduRes.json() : [];
      const skillsArr = skillsRes.ok ? await skillsRes.json() : [];

      setResumeData({
        personalInfo: {
          name: user?.user_metadata?.full_name || user?.email || '',
          location: user?.user_metadata?.location || '',
          phone: user?.user_metadata?.phone || '',
          email: user?.email || '',
          linkedin: user?.user_metadata?.linkedin || '',
          github: user?.user_metadata?.github || '',
        },
        education: education.map((e: any) => ({
          school: e.institution, degree: e.degree, dates: `${formatDate(e.startDate)} - ${e.endDate ? formatDate(e.endDate) : 'Present'}`, gpa: e.gpa?.toString() || '', achievements: '',
        })),
        experience: experience.map((e: any) => ({
          company: e.company, position: e.title, location: e.location, dates: `${formatDate(e.startDate)} - ${e.endDate ? formatDate(e.endDate) : 'Present'}`, bullets: e.bullets || [],
        })),
        projects: projects.map((p: any) => ({ name: p.name, dates: '', description: p.description })),
        skills: {
          programming: skillsArr.filter((s: any) => s.category === 'Programming Languages').map((s: any) => s.name).join(', '),
          tools: skillsArr.filter((s: any) => s.category === 'Frameworks & Libraries').map((s: any) => s.name).join(', '),
          other: skillsArr.filter((s: any) => s.category === 'DevOps & Cloud').map((s: any) => s.name).join(', '),
        },
        leadership: [],
      });
    };
    fetchData();
  }, []);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Right-hand sidebar containing all editor controls
  function EditorSidebar() {
    if (!resumeData) return <div className="w-[480px] flex items-center justify-center"><p>Loading Editor...</p></div>;
    
    return (
      <aside className="w-[480px] bg-white border-l shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Resume Editor</h2>
          <p className="text-sm text-gray-500">Click to expand, then drag to reorder sections.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
              {sectionOrder.map((key) => {
                const section = SECTION_CONFIG.find(s => s.key === key);
                if (!section) return null;

                return (
                  <SortableEditorPanel 
                    key={key}
                    id={key}
                    section={section}
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    isExpanded={!!expandedSections[key]}
                    onToggle={() => toggleSection(key)}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </div>

        <div className="p-4 border-t bg-white space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                <Download className="w-5 h-5" />
                Export PDF
            </button>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2 py-2 font-medium">
                <Plus size={18} />
                Add Custom Section
            </button>
        </div>
      </aside>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <div className="flex flex-1 overflow-hidden pt-4"> 
        
        {/* Left Side: Resume Preview */}
        <main className="flex-1 p-8 bg-gray-200 overflow-y-auto">
          {resumeData ? (
            <ResumePreview data={resumeData} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Loading Resume Preview...</p>
            </div>
          )}
        </main>
        
        {/* Right Side: Editor Controls */}
        <EditorSidebar />
      </div>
    </div>
  );
};

export default ResumeEditorPage;