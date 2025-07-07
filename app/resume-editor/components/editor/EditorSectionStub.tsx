// app/resume-editor/components/editor/EditorSectionStub.tsx
import React from 'react';
import SectionHeader from '../commons/SectionHeader';

interface Props {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const EditorSectionStub = ({ title, isExpanded, onToggle }: Props) => (
  <div className="border rounded-lg">
    <SectionHeader
      title={title}
      isExpanded={isExpanded}
      onToggle={onToggle}
      onEdit={() => {}}
      onDelete={() => {}}
    />
    {isExpanded && (
      <div className="p-3 text-sm text-gray-500">
        Editing for this section will be here.
      </div>
    )}
  </div>
);

export default EditorSectionStub;