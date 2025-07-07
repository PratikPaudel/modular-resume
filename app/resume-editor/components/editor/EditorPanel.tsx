// app/resume-editor/components/editor/EditorPanel.tsx
import React from 'react';
import { ResumeData } from '../../../types';
import { Plus } from 'lucide-react';
import PersonalInfoEditor from './PersonalInfoEditor';
import EditorSectionStub from './EditorSectionStub'; // Placeholder for other sections

interface EditorPanelProps {
  sectionKey: string;
  resumeData: ResumeData | null;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData | undefined>>;
  expandedSections: any;
  toggleSection: (section: any) => void;
}

const EditorPanel = ({ sectionKey, resumeData, setResumeData, expandedSections, toggleSection }: EditorPanelProps) => {
  return (
    <div className="p-4">
      {/* Editor Sections */}
      <div className="space-y-2">
        <PersonalInfoEditor
          data={resumeData?.personalInfo}
          setData={setResumeData}
          isExpanded={expandedSections.personalInfo}
          onToggle={() => toggleSection('personalInfo')}
        />
        <EditorSectionStub
          title="EDUCATION"
          isExpanded={expandedSections.education}
          onToggle={() => toggleSection('education')}
        />
        <EditorSectionStub
          title="EXPERIENCE"
          isExpanded={expandedSections.experience}
          onToggle={() => toggleSection('experience')}
        />
        <EditorSectionStub
          title="PROJECTS/OPEN SOURCE"
          isExpanded={expandedSections.projects}
          onToggle={() => toggleSection('projects')}
        />
        <EditorSectionStub
          title="TECHNICAL SKILLS"
          isExpanded={expandedSections.skills}
          onToggle={() => toggleSection('skills')}
        />
        <EditorSectionStub
          title="LEADERSHIPS"
          isExpanded={expandedSections.leadership}
          onToggle={() => toggleSection('leadership')}
        />

        <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2">
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;