"use client"

import React, { useState } from 'react';

const SubstituteCalendar = () => {
  // Mock data for classrooms
  const classrooms = [
    'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105',
    'Room 106', 'Room 107', 'Room 108', 'Room 109', 'Room 110'
  ];

  // Mock data for substitute teachers
  const [substitutes] = useState([
    'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim',
    'Rachel Thompson', 'James Wilson', 'Maria Garcia', 'Steven Lee'
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
                key={teacher}
                draggable
                onDragStart={(e) => handleDragStart(e, teacher)}
                className="p-3 bg-gray-50 rounded border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
              >
                {teacher}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstituteCalendar;
