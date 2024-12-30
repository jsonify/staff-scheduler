// app/components/calendar/TimeGrid.tsx

import React from 'react';
import { AssignmentWithDetails, Classroom } from '@/app/types';
import { AssignmentCard } from './AssignmentCard';

interface TimeGridProps {
  classrooms: Classroom[];
  assignments: AssignmentWithDetails[];
  onDrop: (time: string, classroom: string) => void;
  onEditAssignment: (assignment: AssignmentWithDetails) => void;
  onDeleteAssignment: (id: string) => void;
}

export function TimeGrid({ 
  classrooms, 
  assignments, 
  onDrop,
  onEditAssignment,
  onDeleteAssignment
}: TimeGridProps) {
  const handleDrop = (e: React.DragEvent, time: string, classroom: string) => {
    e.preventDefault();
    onDrop(time, classroom);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-[auto_repeat(10,minmax(150px,1fr))] gap-1">
        {/* Header */}
        <div className="sticky left-0 bg-slate-900 p-2" />
        {classrooms.map((classroom) => (
          <div 
            key={classroom.id} 
            className="bg-slate-900 p-2 text-center text-slate-200"
          >
            {classroom.name}
          </div>
        ))}

        {/* Time slots */}
        {Array.from({ length: 14 }).map((_, index) => {
          const hour = Math.floor(index / 2) + 9;
          const minute = index % 2 === 0 ? '00' : '30';
          const time = `${hour.toString().padStart(2, '0')}:${minute}`;

          return (
            <React.Fragment key={time}>
              <div className="sticky left-0 bg-slate-900 p-2 text-slate-200">
                {time}
              </div>
              {classrooms.map((classroom) => {
                const assignment = assignments.find(
                  a => a.time === time && a.classroom === classroom.id
                );

                return (
                  <div
                    key={`${classroom.id}-${time}`}
                    className="bg-slate-800 p-1 min-h-[60px]"
                    onDrop={(e) => handleDrop(e, time, classroom.id)}
                    onDragOver={handleDragOver}
                  >
                    {assignment && (
                      <AssignmentCard
                        assignment={assignment}
                        onEdit={onEditAssignment}
                        onDelete={onDeleteAssignment}
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}