import React, { useState } from 'react';
import TimeBlock from './TimeBlock';
import EmployeeCard from './EmployeeCard';
import '../../styles/Scheduler.css';

const EmployeeScheduler = () => {
  const [timeBlocks, setTimeBlocks] = useState([]);

  const handleDrop = (employeeId, timeSlot) => {
    // Logic to assign time block to employee
    console.log(`Assigned ${timeSlot} to employee ${employeeId}`);
  };

  return (
    <div className="scheduler-container">
      <div className="time-grid">
        {Array.from({ length: 24 }, (_, i) => (
          <TimeBlock key={i} time={`${i}:00`} onDrop={handleDrop} />
        ))}
      </div>
      <div className="employee-list">
        <EmployeeCard id="1" name="John Doe" role="Teacher" />
        <EmployeeCard id="2" name="Jane Smith" role="Para-Educator" />
      </div>
    </div>
  );
};

export default EmployeeScheduler;
