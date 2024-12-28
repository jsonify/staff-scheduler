import React from 'react';

const EmployeeCard = ({ id, name, role }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('employeeId', id);
  };

  return (
    <div 
      className="employee-card"
      draggable
      onDragStart={handleDragStart}
    >
      <h3>{name}</h3>
      <p>{role}</p>
      <div className="time-bank">
        <span>Available Time: 8 hours</span>
      </div>
    </div>
  );
};

export default EmployeeCard;
