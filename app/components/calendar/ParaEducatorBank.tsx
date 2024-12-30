// app/components/calendar/ParaEducatorBank.tsx

import React from 'react';
import { ParaEducator } from '@/app/types';

interface ParaEducatorBankProps {
  paraEducators: ParaEducator[];
  onDragStart: (paraEducator: ParaEducator) => void;
}

export function ParaEducatorBank({ paraEducators, onDragStart }: ParaEducatorBankProps) {
  return (
    <div className="w-64 bg-slate-900 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">ParaEducators</h2>
      <div className="space-y-2">
        {paraEducators.map((para) => (
          <div
            key={para.$id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('paraEducatorId', para.$id);
              onDragStart(para);
            }}
            className="p-3 bg-slate-800 rounded cursor-move hover:bg-slate-700 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-slate-200">{para.name}</span>
              <span className="text-sm text-slate-400">
                {para.timeBank}h remaining
              </span>
            </div>
            {para.status && (
              <span className="text-xs text-slate-400 block mt-1">
                {para.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}