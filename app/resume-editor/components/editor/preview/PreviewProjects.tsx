// app/resume-editor/components/preview/PreviewProjects.tsx
import React from 'react';
import { ProjectEntry } from '../../../../types';

interface Props {
  data: ProjectEntry[];
}

const PreviewProjects = ({ data }: Props) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">PROJECTS/OPEN SOURCE</h2>
    {data.map((project, index) => (
      <div key={index} className="mb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{project.name}</h3>
            <p className="text-sm">{project.description}</p>
          </div>
          <div className="text-sm">
            <p>{project.dates}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default PreviewProjects;