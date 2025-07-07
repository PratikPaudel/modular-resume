// app/resume-editor/components/preview/PreviewEducation.tsx
import React from 'react';
import { EducationEntry } from '../../../../types';

interface Props {
  data: EducationEntry[];
}

const PreviewEducation = ({ data }: Props) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">EDUCATION</h2>
    {data.map((edu, index) => (
      <div key={index} className="mb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{edu.school}</h3>
            <p className="text-sm italic">{edu.degree}</p>
            <p className="text-sm">{edu.gpa}</p>
            <p className="text-sm">{edu.achievements}</p>
          </div>
          <div className="text-sm text-right">
            <p>{edu.dates}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default PreviewEducation;