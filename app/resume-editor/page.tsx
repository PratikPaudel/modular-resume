'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';
import { supabase } from '../../lib/supabaseClient';
import ResumeHeader from './components/ResumeHeader';
import ResumePreview from './components/editor/preview/ResumePreview';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Download, User, GraduationCap, Briefcase, FolderOpen, Code2, Trophy } from 'lucide-react';
import EditorPanel from './components/editor/EditorPanel';

const SECTION_CONFIG = [
  { key: 'personalInfo', label: 'Personal Info', icon: User },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'skills', label: 'Technical Skills', icon: Code2 },
  { key: 'leadership', label: 'Leadership', icon: Trophy },
];

function SortableSidebarItem({ id, label, icon: Icon, active, listeners, attributes, setNodeRef, style, onClick }) {
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors font-medium text-base mb-1
        ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      {label}
    </div>
  );
}

const ResumeEditorPage = () => {
  const [sectionOrder, setSectionOrder] = useState(SECTION_CONFIG.map(s => s.key));
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [expandedSections, setExpandedSections] = useState(() => {
    const obj = {};
    SECTION_CONFIG.forEach(s => { obj[s.key] = true; });
    return obj;
  });
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Get Supabase user
      const { data: { user } } = await supabase.auth.getUser();

      // 2. Fetch all resume sections from your APIs
      const [expRes, projRes, eduRes, skillsRes] = await Promise.all([
        fetch('/api/experience'),
        fetch('/api/project'),
        fetch('/api/education'),
        fetch('/api/skills'),
      ]);

      const experience = expRes.ok ? await expRes.json() : [];
      const projects = projRes.ok ? await projRes.json() : [];
      const education = eduRes.ok ? await eduRes.json() : [];
      const skillsArr = skillsRes.ok ? await skillsRes.json() : [];

      // 3. Map API data to ResumeData shape
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
          school: e.institution,
          degree: e.degree,
          dates: `${e.startDate} - ${e.endDate || 'Present'}`,
          gpa: e.gpa?.toString() || '',
          achievements: '', // Map if you have this field
        })),
        experience: experience.map((e: any) => ({
          company: e.company,
          position: e.title,
          location: e.location,
          dates: `${e.startDate} - ${e.endDate || 'Present'}`,
          bullets: e.bullets || [],
        })),
        projects: projects.map((p: any) => ({
          name: p.name,
          dates: '', // Add if you have project dates
          description: p.description,
        })),
        skills: {
          programming: skillsArr.filter((s: any) => s.category === 'Programming').map((s: any) => s.name).join(', '),
          tools: skillsArr.filter((s: any) => s.category === 'Tools').map((s: any) => s.name).join(', '),
          other: skillsArr.filter((s: any) => s.category === 'Other').map((s: any) => s.name).join(', '),
        },
        leadership: [], // Fill if you have this data
      });
    };

    fetchData();
  }, []);

  // DnD-kit handlers
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Sidebar rendering
  function Sidebar() {
    return (
      <aside className="w-72 bg-white border-r flex flex-col py-8 px-4 shadow-sm">
        <div className="mb-8 text-2xl font-bold tracking-tight text-blue-700">Resume Editor</div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
            {sectionOrder.map((key) => {
              const section = SECTION_CONFIG.find(s => s.key === key);
              return (
                <SortableSidebarSection
                  key={key}
                  id={key}
                  label={section.label}
                  icon={section.icon}
                  active={activeSection === key}
                  onClick={() => setActiveSection(key)}
                />
              );
            })}
          </SortableContext>
        </DndContext>
        <button className="mt-8 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Export PDF
        </button>
      </aside>
    );
  }

  // Sortable sidebar section
  function SortableSidebarSection(props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return <SortableSidebarItem {...props} setNodeRef={setNodeRef} listeners={listeners} attributes={attributes} style={style} />;
  }

  // Editor panel rendering (order matches sidebar)
  function OrderedEditorPanel() {
    if (!resumeData) return <div>Loading...</div>;
    return (
      <div className="space-y-4">
        {sectionOrder.map((key) => (
          <EditorPanel
            key={key}
            sectionKey={key}
            resumeData={resumeData}
            setResumeData={setResumeData}
            isExpanded={expandedSections[key]}
            onToggle={() => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <ResumeHeader />
      <div className="flex-1 flex pt-32">
        <main className="flex-1 p-6 overflow-y-auto">
          <OrderedEditorPanel />
          <div className="mt-8">
            {resumeData && <ResumePreview data={resumeData} />}
          </div>
        </main>
        <Sidebar />
      </div>
    </div>
  );
};

export default ResumeEditorPage;