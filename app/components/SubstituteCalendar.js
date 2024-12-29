"use client"

import React, { useState, useEffect } from 'react';

const SubstituteCalendar = () => {
  const classrooms = [
    'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105',
    'Room 106', 'Room 107', 'Room 108', 'Room 109', 'Room 110'
  ];

  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  });

  // State for substitute teachers with time banks
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

  // Helper function to count current assignments for a teacher
  const getTeacherAssignmentCount = (teacherName) => {
    return assignments.filter(a => a.teacher === teacherName).length;
  };

  // Handle drag start with improved validation
  const handleDragStart = (e, teacher, sourceTime, sourceClassroom) => {
    const teacherData = substitutes.find(sub => sub.name === teacher);
    
    // Clear any previous error messages
    setDragError(null);

    // If this is a new assignment (not moving an existing one)
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

  // Updated deductTime function with better handling
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

  // Updated drop handler with improved logic
  const handleDrop = (e, time, classroom) => {
    e.preventDefault();
    const teacher = e.dataTransfer.getData('teacher');
    const sourceTime = e.dataTransfer.getData('sourceTime');
    const sourceClassroom = e.dataTransfer.getData('sourceClassroom');
    
    // Check if teacher has available hours for new assignment
    const teacherData = substitutes.find(sub => sub.name === teacher);
    if (!sourceTime && (!teacherData || teacherData.timeBank <= 0)) {
      setDragError(`Cannot assign ${teacher} - no hours remaining`);
      return;
    }

    // Remove any existing assignment at the target location
    let newAssignments = assignments.filter(a => 
      !(a.time === time && a.classroom === classroom)
    );

    // Handle moving existing assignment
    if (sourceTime && sourceClassroom) {
      newAssignments = newAssignments.filter(a => 
        !(a.time === sourceTime && a.classroom === sourceClassroom)
      );
    } else {
      // Only deduct time for new assignments
      deductTime(teacher);
    }

    // Add the new assignment
    setAssignments([...newAssignments, { time, classroom, teacher }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Helper to find assignment for a specific time/classroom
  const getAssignment = (time, classroom) => {
    return assignments.find(a => 
      a.time === time && a.classroom === classroom
    );
  };

  // Optional: Clear error message after a delay
  useEffect(() => {
    if (dragError) {
      const timer = setTimeout(() => setDragError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [dragError]);

  return (
    <div className="p-6 bg-orange-50">
      <h1 className="text-3xl font-bold mb-8 text-orange-900">Daily Substitute Teacher Schedule</h1>
      
      {dragError && (
        <div className="mb-4 p-3 bg-red-200 text-red-900 rounded-lg">
          {dragError}
        </div>
      )}
      
      <div className="flex gap-8">
        {/* Calendar section */}
        <div className="flex-1 overflow-auto">
          <div className="bg-orange-100 rounded-lg shadow border border-orange-200">
            {/* Table header */}
            <div className="flex border-b border-orange-200">
              <div className="w-24 flex-shrink-0 p-4 font-semibold text-orange-900 bg-orange-50">Time</div>
              {classrooms.map(room => (
                <div 
                  key={room} 
                  className="flex-1 p-4 font-semibold text-orange-900 text-center bg-orange-50 border-l border-orange-200"
                >
                  {room}
                </div>
              ))}
            </div>

            {/* Time slots and cells */}
            {timeSlots.map(time => (
              <div key={time} className="flex border-b border-orange-200">
                <div className="w-24 flex-shrink-0 p-4 font-medium text-orange-800 bg-orange-50">
                  {time}
                </div>
                {classrooms.map(room => (
                  <div
                    key={`${time}-${room}`}
                    className="flex-1 p-4 min-h-16 border-l border-orange-200"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, time, room)}
                  >
                    {getAssignment(time, room) && (
                      <div
                        className="bg-amber-200 text-amber-900 p-2 rounded text-sm text-center cursor-move shadow-sm hover:bg-amber-300 transition-colors"
                        draggable
                        onDragStart={(e) => handleDragStart(
                          e,
                          getAssignment(time, room).teacher,
                          time,
                          room
                        )}
                      >
                        {getAssignment(time, room).teacher}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Substitute teacher bank */}
        <div className="w-64 bg-orange-50 p-4 border border-orange-200 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4 text-orange-900">Substitute Teachers</h2>
          <div className="space-y-2">
            {substitutes.map((teacher) => (
              <div
                key={teacher.name}
                draggable={teacher.timeBank > 0}
                onDragStart={(e) => handleDragStart(e, teacher.name)}
                className={`p-3 bg-orange-100 rounded border border-orange-200 transition-colors ${
                  teacher.timeBank > 0 
                    ? 'cursor-move hover:bg-orange-200' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-orange-900">{teacher.name}</span>
                  <span className={`text-sm ${
                    teacher.timeBank === 0 ? 'text-red-700' : 'text-orange-700'
                  }`}>
                    {teacher.timeBank}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstituteCalendar;
