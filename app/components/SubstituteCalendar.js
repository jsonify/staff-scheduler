"use client"

import React, { useState } from 'react';

const SubstituteCalendar = () => {
  // Mock data for classrooms
  const classrooms = [
    'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105',
    'Room 106', 'Room 107', 'Room 108', 'Room 109', 'Room 110'
  ];

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

  // Generate time slots from 9 AM to 4 PM
  const timeSlots = Array.from({ length: 8 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  });

  // State to track assignments as an array of objects
  const [assignments, setAssignments] = useState([]);

  // Handle drag start
  const handleDragStart = (e, teacher, time, classroom) => {
    e.dataTransfer.setData('teacher', teacher);
    e.dataTransfer.setData('sourceTime', time);
    e.dataTransfer.setData('sourceClassroom', classroom);
  };

  // Handle drop
  const handleDrop = (e, time, classroom) => {
    e.preventDefault();
    const teacher = e.dataTransfer.getData('teacher');
    const sourceTime = e.dataTransfer.getData('sourceTime');
    const sourceClassroom = e.dataTransfer.getData('sourceClassroom');
    
    // Remove any existing assignment for this time/classroom
    let newAssignments = assignments.filter(a => 
      !(a.time === time && a.classroom === classroom)
    );
    
    // If moving an existing assignment, remove it from its original location
    if (sourceTime && sourceClassroom) {
      newAssignments = newAssignments.filter(a => 
        !(a.time === sourceTime && a.classroom === sourceClassroom)
      );
    } else {
      // Deduct time only for new assignments
      setSubstitutes(prev => 
        prev.map(sub => 
          sub.name === teacher && sub.timeBank > 0 
            ? { ...sub, timeBank: sub.timeBank - 1 }
            : sub
        )
      );
    }
    
    // Add the new assignment
    newAssignments.push({ time, classroom, teacher });
    setAssignments(newAssignments);
  };

  // Helper to find assignment for a specific time/classroom
  const getAssignment = (time, classroom) => {
    return assignments.find(a => 
      a.time === time && a.classroom === classroom
    );
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Daily Substitute Teacher Schedule</h1>
      
      <div className="flex gap-8">
        {/* Calendar section */}
        <div className="flex-1 overflow-auto">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            {/* Table header */}
            <div className="flex border-b border-gray-200">
              <div className="w-24 flex-shrink-0 p-4 font-semibold text-gray-700 bg-gray-50">Time</div>
              {classrooms.map(room => (
                <div 
                  key={room} 
                  className="flex-1 p-4 font-semibold text-gray-700 text-center bg-gray-50 border-l border-gray-200"
                >
                  {room}
                </div>
              ))}
            </div>

            {/* Time slots and cells */}
            {timeSlots.map(time => (
              <div key={time} className="flex border-b border-gray-200">
                <div className="w-24 flex-shrink-0 p-4 font-medium text-gray-600 bg-gray-50">
                  {time}
                </div>
                {classrooms.map(room => (
                  <div
                    key={`${time}-${room}`}
                    className="flex-1 p-4 min-h-16 border-l border-gray-200"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, time, room)}
                  >
                    {getAssignment(time, room) && (
                      <div
                        className="bg-blue-100 text-blue-800 p-2 rounded text-sm text-center cursor-move"
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
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Substitute Teachers</h2>
          <div className="space-y-2">
            {substitutes.map((teacher) => (
              <div
                key={teacher.name}
                draggable
                onDragStart={(e) => handleDragStart(e, teacher.name)}
                className={`p-3 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100 transition-colors ${
                  teacher.timeBank === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                title={teacher.timeBank === 0 ? 'No hours remaining' : ''}
              >
                <div className="flex justify-between items-center">
                  <span>{teacher.name}</span>
                  <span className="text-sm text-gray-600">{teacher.timeBank}h</span>
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
