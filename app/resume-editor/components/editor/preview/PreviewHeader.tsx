// app/resume-editor/components/preview/PreviewHeader.tsx
import React from 'react';
import { PersonalInfo } from '../../../../types';

interface Props {
  data: PersonalInfo;
}

const PreviewHeader = ({ data }: { data: any }) => (
  <header className="text-center mb-6 pb-4 border-b-2 border-gray-800">
    <h1 className="text-3xl font-bold mb-2 text-gray-900">{data.name}</h1>
    <div className="text-sm text-gray-700 flex justify-center gap-1 flex-wrap">
      <span>{data.location}</span>
      <span>|</span>
      <span>{data.phone}</span>
      <span>|</span>
      <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">{data.email}</a>
      <span>|</span>
      <a href={data.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
      <span>|</span>
      <a href={data.github} className="text-blue-600 hover:underline">GitHub</a>
      <span>|</span>
      <a href="#" className="text-blue-600 hover:underline">Portfolio</a>
    </div>
  </header>
);

export default PreviewHeader;