// app/resume-editor/components/preview/PreviewEducation.tsx
import React from 'react';
import { EducationEntry } from '../../../../types';

interface Props {
  data: EducationEntry[];
}

const PreviewEducation = ({ data }: { data: any[] }) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">EDUCATION</h2>
    {data.map((edu, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{edu.school}</h3>
            <p className="text-sm italic text-gray-700">{edu.degree}</p>
            {edu.gpa && <p className="text-sm text-gray-700">• GPA: {edu.gpa}</p>}
            {edu.achievements && <p className="text-sm text-gray-700">• <span className="font-semibold">Achievements:</span> {edu.achievements}</p>}
          </div>
          <div className="text-sm text-right text-gray-700 ml-4">
            <p className="font-semibold">{edu.dates}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default PreviewEducation;