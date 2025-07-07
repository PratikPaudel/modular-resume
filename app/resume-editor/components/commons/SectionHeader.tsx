// app/resume-editor/components/common/SectionHeader.tsx
import React from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';

interface Props {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const SectionHeader = ({ title, isExpanded, onToggle, onEdit, onDelete }: Props) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
    <div className="flex items-center gap-2">
      <button onClick={onToggle} className="p-1 hover:bg-gray-200 rounded">
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <span className="font-medium text-sm">{title}</span>
    </div>
    <div className="flex items-center gap-1">
      <button onClick={onEdit} className="p-1 hover:bg-gray-200 rounded">
        <Edit2 size={14} />
      </button>
      <button onClick={onDelete} className="p-1 hover:bg-gray-200 rounded text-red-500">
        <Trash2 size={14} />
      </button>
    </div>
  </div>
);

export default SectionHeader;