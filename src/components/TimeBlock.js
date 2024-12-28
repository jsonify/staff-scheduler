import React from 'react';

const TimeBlock = ({ time, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const employeeId = e.dataTransfer.getData('employeeId');
    onDrop(employeeId, time);
  };

  return (
    <div 
      className="time-block"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {time}
    </div>
  );
};

export default TimeBlock;
