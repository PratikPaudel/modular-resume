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
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 min-h-[800px]">
      <PreviewHeader data={data.personalInfo} />
      <PreviewEducation data={data.education} />
      <PreviewExperience data={data.experience} />
      <PreviewProjects data={data.projects} />
      <PreviewSkills data={data.skills} />
      <PreviewLeadership data={data.leadership} />
    </div>
  );
};

export default ResumePreview;