// app/resume-editor/components/preview/PreviewLeadership.tsx
import React from 'react';
import { LeadershipEntry } from '../../../../types';

interface Props {
  data: LeadershipEntry[];
}

const PreviewLeadership = ({ data }: Props) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">LEADERSHIPS</h2>
    {data.map((leadership, index) => (
      <div key={index} className="mb-3">
        <h3 className="font-semibold">{leadership.role}</h3>
        <ul className="text-sm space-y-1">
          {leadership.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export default PreviewLeadership;