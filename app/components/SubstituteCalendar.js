"use client"

import React, { useState, useEffect, useRef } from 'react';

// Separate Modal Component
const AssignmentModal = ({ assignment, onClose }) => {
  if (!assignment) return null;

  return (
    <div className="fixed inset-0 bg-[#272822]/90 flex items-center justify-center p-4 z-50">
      <div className="bg-[#3E3D32] rounded-lg p-6 max-w-md w-full border border-[#75715E]">
        <h2 className="text-xl font-bold mb-4 text-[#A6E22E]">Assignment Details</h2>
        <div className="space-y-3">
          <div>
            <p className="text-[#66D9EF]">Teacher:</p>
            <p className="text-[#F8F8F2]">{assignment.teacher}</p>
          </div>
          <div>
            <p className="text-[#66D9EF]">Time:</p>
            <p className="text-[#F8F8F2]">{assignment.time}</p>
          </div>
          <div>
            <p className="text-[#66D9EF]">Classroom:</p>
            <p className="text-[#F8F8F2]">{assignment.classroom}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-[#AE81FF] text-[#272822] rounded hover:bg-[#AE81FF]/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Assignment Card Component with Click vs Drag Detection
const AssignmentCard = ({ assignment, onDragStart, onClick }) => {
  const dragStartPos = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    if (!dragStartPos.current) return;

    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    
    // If the mouse barely moved, consider it a click
    if (dx < 3 && dy < 3 && !isDragging.current) {
      onClick();
    }
    
    dragStartPos.current = null;
    isDragging.current = false;
  };

  const handleDragStart = (e) => {
    isDragging.current = true;
    onDragStart(e);
  };

  return (
    <div
      className="bg-[#AE81FF] text-[#272822] p-2 rounded text-sm text-center cursor-move shadow-sm hover:bg-[#AE81FF]/90 transition-colors"
      draggable
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {assignment.teacher}
    </div>
  );
};

const SubstituteCalendar = () => {
  const classrooms = [
    'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105',
    'Room 106', 'Room 107', 'Room 108', 'Room 109', 'Room 110'
  ];

  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  });

  const [substitutes, setSubstitutes] = useState([
    { name: 'Sarah Johnson', timeBank: 8 },
    { name: 'Michael Chen', timeBank: 8 },
    { name: 'Emily Rodriguez', timeBank: 8 },
    { name: 'David Kim', timeBank: 8 },
    { name: 'Rachel Thompson', timeBank: 8 },
    { name: 'James Wilson', timeBank: 8 },
    { name: 'Maria Garcia', timeBank: 8 },
    { name: 'Steven Lee', timeBank: 8 }
  ]);

  const [assignments, setAssignments] = useState([]);
  const [dragError, setDragError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleDragStart = (e, teacher, sourceTime, sourceClassroom) => {
    const teacherData = substitutes.find(sub => sub.name === teacher);
    setDragError(null);

    if (!sourceTime && !sourceClassroom) {
      if (!teacherData || teacherData.timeBank <= 0) {
        setDragError(`${teacher} has no remaining hours`);
        e.preventDefault();
        return;
      }
    }

    e.dataTransfer.setData('teacher', teacher);
    e.dataTransfer.setData('sourceTime', sourceTime || '');
    e.dataTransfer.setData('sourceClassroom', sourceClassroom || '');
  };

  const deductTime = (teacher) => {
    setSubstitutes(prev => {
      const teacherIndex = prev.findIndex(sub => sub.name === teacher);
      if (teacherIndex === -1 || prev[teacherIndex].timeBank <= 0) {
        return prev;
      }

      const updated = [...prev];
      updated[teacherIndex] = {
        ...updated[teacherIndex],
        timeBank: updated[teacherIndex].timeBank - 1
      };
      return updated;
    });
  };

  const handleDrop = (e, time, classroom) => {
    e.preventDefault();
    const teacher = e.dataTransfer.getData('teacher');
    const sourceTime = e.dataTransfer.getData('sourceTime');
    const sourceClassroom = e.dataTransfer.getData('sourceClassroom');
    
    const teacherData = substitutes.find(sub => sub.name === teacher);
    if (!sourceTime && (!teacherData || teacherData.timeBank <= 0)) {
      setDragError(`Cannot assign ${teacher} - no hours remaining`);
      return;
    }

    let newAssignments = assignments.filter(a => 
      !(a.time === time && a.classroom === classroom)
    );

    if (sourceTime && sourceClassroom) {
      newAssignments = newAssignments.filter(a => 
        !(a.time === sourceTime && a.classroom === sourceClassroom)
      );
    } else {
      deductTime(teacher);
    }

    setAssignments([...newAssignments, { time, classroom, teacher }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getAssignment = (time, classroom) => {
    return assignments.find(a => 
      a.time === time && a.classroom === classroom
    );
  };

  useEffect(() => {
    if (dragError) {
      const timer = setTimeout(() => setDragError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [dragError]);

  return (
    <div className="p-6 bg-[#272822] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#A6E22E]">Daily Substitute Teacher Schedule</h1>
      
      {dragError && (
        <div className="mb-4 p-3 bg-[#F92672]/20 text-[#F92672] rounded-lg border border-[#F92672]/30">
          {dragError}
        </div>
      )}
      
      <div className="flex gap-8">
        <div className="flex-1 overflow-auto">
          <div className="bg-[#3E3D32] rounded-lg shadow border border-[#75715E]">
            <div className="flex border-b border-[#75715E]">
              <div className="w-24 flex-shrink-0 p-4 font-semibold text-[#66D9EF] bg-[#2F2F2A]">Time</div>
              {classrooms.map(room => (
                <div 
                  key={room} 
                  className="flex-1 p-4 font-semibold text-[#66D9EF] text-center bg-[#2F2F2A] border-l border-[#75715E]"
                >
                  {room}
                </div>
              ))}
            </div>

            {timeSlots.map(time => (
              <div key={time} className="flex border-b border-[#75715E]">
                <div className="w-24 flex-shrink-0 p-4 font-medium text-[#F8F8F2] bg-[#2F2F2A]">
                  {time}
                </div>
                {classrooms.map(room => (
                  <div
                    key={`${time}-${room}`}
                    className="flex-1 p-4 min-h-16 border-l border-[#75715E] bg-[#3E3D32]"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, time, room)}
                  >
                    {getAssignment(time, room) && (
                      <AssignmentCard
                        assignment={getAssignment(time, room)}
                        onDragStart={(e) => handleDragStart(
                          e,
                          getAssignment(time, room).teacher,
                          time,
                          room
                        )}
                        onClick={() => setSelectedAssignment(getAssignment(time, room))}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="w-64 bg-[#2F2F2A] p-4 border border-[#75715E] rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4 text-[#66D9EF]">Substitute Teachers</h2>
          <div className="space-y-2">
            {substitutes.map((teacher) => (
              <div
                key={teacher.name}
                draggable={teacher.timeBank > 0}
                onDragStart={(e) => handleDragStart(e, teacher.name)}
                className={`p-3 bg-[#3E3D32] rounded border border-[#75715E] transition-colors ${
                  teacher.timeBank > 0 
                    ? 'cursor-move hover:bg-[#3E3D32]/80' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[#F8F8F2]">{teacher.name}</span>
                  <span className={`text-sm ${
                    teacher.timeBank === 0 ? 'text-[#F92672]' : 'text-[#E6DB74]'
                  }`}>
                    {teacher.timeBank}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AssignmentModal 
        assignment={selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
      />
    </div>
  );
};

export default SubstituteCalendar;