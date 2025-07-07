// app/resume-editor/components/preview/PreviewHeader.tsx
import React from 'react';
import { PersonalInfo } from '../../../../types';

interface Props {
  data: PersonalInfo;
}

const PreviewHeader = ({ data }: Props) => (
  <header className="text-center mb-6">
    <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
    <div className="text-sm text-gray-600 flex justify-center gap-2 flex-wrap">
      <span>{data.location}</span>
      <span>•</span>
      <span>{data.phone}</span>
      <span>•</span>
      <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">{data.email}</a>
      <span>•</span>
      <a href="#" className="text-blue-600 hover:underline">{data.linkedin}</a>
      <span>•</span>
      <a href="#" className="text-blue-600 hover:underline">{data.github}</a>
    </div>
  </header>
);

export default PreviewHeader;