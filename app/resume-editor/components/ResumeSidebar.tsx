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
  toggleSection: (section: string) => void;
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
    // This component now provides the main sidebar frame and scrolling container.
    <aside className="w-[550px] border-l bg-white shadow-lg overflow-y-auto dark:bg-zinc-900 dark:border-zinc-800">
      {activeTab === 'Editor' && resumeData && (
        <EditorPanel
          resumeData={resumeData}
          setResumeData={setResumeData}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      )}
      {activeTab === 'Report' && (
        <div className="p-6 text-center text-zinc-500">
          <p>Resume analysis and feedback will appear here.</p>
        </div>
      )}
      {activeTab === 'Style' && (
        <div className="p-6 text-center text-zinc-500">
          <p>Style customization options will appear here.</p>
        </div>
      )}
    </aside>
  );
};

export default ResumeSidebar;