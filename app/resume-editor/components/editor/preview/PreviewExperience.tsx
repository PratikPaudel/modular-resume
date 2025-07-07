// app/resume-editor/components/preview/PreviewExperience.tsx
import React from 'react';
import { ExperienceEntry } from '../../../../types';

interface Props {
  data: ExperienceEntry[];
}

const PreviewExperience = ({ data }: Props) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">EXPERIENCE</h2>
    {data.map((exp, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{exp.company}</h3>
            <p className="text-sm italic">{exp.position}</p>
          </div>
          <div className="text-sm text-right">
            <p>{exp.dates}</p>
            <p className="italic">{exp.location}</p>
          </div>
        </div>
        <ul className="text-sm space-y-1">
          {exp.bullets.map((bullet, bulletIndex) => (
            <li key={bulletIndex} className="flex">
              <span className="mr-2">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default PreviewExperience;