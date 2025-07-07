// app/resume-editor/components/preview/PreviewProjects.tsx
import React from 'react';
import { ProjectEntry } from '../../../../types';

interface Props {
  data: ProjectEntry[];
}

const PreviewProjects = ({ data }: { data: any[] }) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">PROJECTS/OPEN SOURCE</h2>
    {data.map((project, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-700">• {project.description}</p>
          </div>
          <div className="text-sm text-right text-gray-700 ml-4">
            <p className="font-semibold">{project.dates}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
);


export default PreviewProjects;