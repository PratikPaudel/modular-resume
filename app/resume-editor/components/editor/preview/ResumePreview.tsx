// app/resume-editor/components/preview/ResumePreview.tsx
import React from 'react';
import { ResumeData } from '../../../../types';
import PreviewHeader from './PreviewHeader';
import PreviewEducation from './PreviewEducation';
import PreviewExperience from './PreviewExperience';
import PreviewProjects from './PreviewProjects';
import PreviewSkills from './PreviewSkills';
import PreviewLeadership from './PreviewLeadership';

interface Props {
  data: ResumeData;
}

const ResumePreview = ({ data }: Props) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-12 min-h-[800px] font-serif leading-relaxed">
      {/* Header */}
      <PreviewHeader data={data.personalInfo} />
      
      {/* Education */}
      <PreviewEducation data={data.education} />
      
      {/* Experience */}
      <PreviewExperience data={data.experience} />
      
      {/* Projects */}
      <PreviewProjects data={data.projects} />
      
      {/* Technical Skills */}
      <PreviewSkills data={data.skills} />
      
      {/* Leadership */}
      <PreviewLeadership data={data.leadership} />
    </div>
  );
};

export default ResumePreview;