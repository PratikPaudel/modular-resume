// app/resume-editor/components/preview/PreviewExperience.tsx
import React from 'react';
import { ExperienceEntry } from '../../../../types';

interface Props {
  data: ExperienceEntry[];
}

const PreviewExperience = ({ data }: { data: any[] }) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">EXPERIENCE</h2>
    {data.map((exp, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{exp.company}</h3>
            <p className="text-sm italic text-gray-700">{exp.position}</p>
          </div>
          <div className="text-sm text-right text-gray-700 ml-4">
            <p className="font-semibold">{exp.dates}</p>
            <p className="italic">{exp.location}</p>
          </div>
        </div>
        <ul className="text-sm space-y-1 text-gray-700">
          {exp.bullets.map((bullet: string, bulletIndex: number) => (
            <li key={bulletIndex} className="flex">
              <span className="mr-2 font-bold">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export default PreviewExperience;