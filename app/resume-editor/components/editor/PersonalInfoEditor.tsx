// app/resume-editor/components/editor/PersonalInfoEditor.tsx
import React from 'react';
import { PersonalInfo, ResumeData } from '../../../types';
import SectionHeader from '../commons/SectionHeader';

interface Props {
  data: PersonalInfo | undefined;
  setData: React.Dispatch<React.SetStateAction<ResumeData | undefined>>;
  isExpanded: boolean;
  onToggle: () => void;
}

const PersonalInfoEditor = ({ data, setData, isExpanded, onToggle }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (data) {
      setData((prev: ResumeData | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [name]: value },
        };
      });
    }
  };

  return (
    <div className="border rounded-lg">
      <SectionHeader
        title="PERSONAL INFO"
        isExpanded={isExpanded}
        onToggle={onToggle}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      {isExpanded && (
        <div className="p-3 space-y-2">
          <input
            type="text"
            name="name"
            value={data?.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="email"
            value={data?.email}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={data?.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded text-sm"
            placeholder="Phone"
          />
        </div>
      )}
    </div>
  );
};

export default PersonalInfoEditor;