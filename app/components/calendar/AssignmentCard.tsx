// app/components/calendar/AssignmentCard.tsx

import React from 'react';
import { AssignmentWithDetails } from '@/app/types';

interface AssignmentCardProps {
  assignment: AssignmentWithDetails;
  onEdit: (assignment: AssignmentWithDetails) => void;
  onDelete: (id: string) => void;
}

export function AssignmentCard({ assignment, onEdit, onDelete }: AssignmentCardProps) {
  return (
    <div className="p-2 bg-slate-800 rounded shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-slate-200">
          {assignment.paraEducatorName}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(assignment)}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(assignment.$id)}
            className="text-xs text-red-400 hover:text-red-200"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-1">{assignment.time}</p>
    </div>
  );
}