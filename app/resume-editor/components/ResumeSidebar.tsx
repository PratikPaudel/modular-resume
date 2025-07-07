// app/resume-editor/components/ResumeSidebar.tsx
import React from 'react';
import { ResumeData } from '../../types';
import EditorPanel from './editor/EditorPanel';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resumeData: ResumeData | null;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData | undefined>>;
  expandedSections: any; // Consider creating a specific type for this
  toggleSection: (section: any) => void;
}

const ResumeSidebar = ({
  activeTab,
  setActiveTab,
  resumeData,
  setResumeData,
  expandedSections,
  toggleSection,
}: Props) => {
  return (
    <aside className="w-96 bg-white border-l shadow-lg overflow-y-auto">
      {/* Content */}
      {activeTab === 'Editor' && (
        <EditorPanel
          sectionKey={activeTab}
          resumeData={resumeData}
          setResumeData={setResumeData}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      )}
      {activeTab === 'Report' && (
        <div className="p-4 text-center text-gray-500">
          <p>Resume analysis and feedback will appear here.</p>
        </div>
      )}
      {activeTab === 'Style' && (
        <div className="p-4 text-center text-gray-500">
          <p>Style customization options will appear here.</p>
        </div>
      )}
    </aside>
  );
};

export default ResumeSidebar;