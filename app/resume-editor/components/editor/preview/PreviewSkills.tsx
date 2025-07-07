// app/resume-editor/components/preview/PreviewSkills.tsx
import React from 'react';
import { Skills } from '../../../../types';

interface Props {
  data: Skills;
}

const PreviewSkills = ({ data }: Props) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">TECHNICAL SKILLS</h2>
    <div className="text-sm space-y-1">
      <p>
        <span className="font-semibold">Programming Languages:</span> {data.programming}
      </p>
      <p>
        <span className="font-semibold">Tools & Frameworks:</span> {data.tools}
      </p>
      <p>
        <span className="font-semibold">Other:</span> {data.other}
      </p>
    </div>
  </section>
);

export default PreviewSkills;