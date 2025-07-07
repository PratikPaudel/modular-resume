// app/resume-editor/components/ResumeHeader.tsx
import React from 'react';

const ResumeHeader = () => (
  <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-6 py-4">
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">
          ← Back to Analysis
        </button>
      </div>
    <div className="mt-4">
    </div>
  </header>
);

export default ResumeHeader;