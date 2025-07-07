// app/resume-editor/components/preview/PreviewLeadership.tsx
import React from 'react';
import { LeadershipEntry } from '../../../../types';

interface Props {
  data: LeadershipEntry[];
}

const PreviewLeadership = ({ data }: { data: any[] }) => (
  <section className="mb-6">
    <h2 className="text-lg font-bold mb-3 text-gray-900 border-b border-gray-400 pb-1">LEADERSHIPS</h2>
    {data.map((leadership, index) => (
      <div key={index} className="mb-4">
        <h3 className="font-bold text-gray-900">{leadership.role}</h3>
        <div className="text-sm text-gray-700">
          <p className="font-semibold">{leadership.organization}</p>
          <p className="italic">{leadership.dates}</p>
        </div>
        <ul className="text-sm space-y-1 text-gray-700 mt-1">
          {leadership.items.map((item: string, itemIndex: number) => (
            <li key={itemIndex} className="flex">
              <span className="mr-2 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);

export default PreviewLeadership;