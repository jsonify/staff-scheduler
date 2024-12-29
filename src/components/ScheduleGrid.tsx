import { useState } from 'react'
import { TimeBlock, Employee } from '../App'
import TimeBlockComponent from './TimeBlock'

interface ScheduleGridProps {
  timeBlocks: TimeBlock[]
  setTimeBlocks: (blocks: TimeBlock[]) => void
  employees: Employee[]
}

export default function ScheduleGrid({ timeBlocks, setTimeBlocks, employees }: ScheduleGridProps) {
  const [draggingBlock, setDraggingBlock] = useState<TimeBlock | null>(null)

  const handleDrop = (targetBlock: TimeBlock, employeeId: string) => {
    const updatedBlocks = timeBlocks.map(block => {
      // Remove the block from its previous employee
      if (block.employeeId === employeeId) {
        return { ...block, employeeId: null }
      }
      // Assign the block to the new employee
      if (block.id === targetBlock.id) {
        return { ...block, employeeId }
      }
      return block
    })
    setTimeBlocks(updatedBlocks)
    setDraggingBlock(null)
  }

  const timeSlots = Array.from({ length: 9 }, (_, i) => `${i + 8}:00`); // 8:00 AM to 4:00 PM
  const DAILY_HOURS = 8; // 8 hours per day

  const calculateUsedHours = (employeeId: string) => {
    return timeBlocks
      .filter(block => block.employeeId === employeeId)
      .length;
  };

  const renderTimeGrid = () => {
    return (
      <div className="time-grid">
        {timeSlots.map((time, index) => (
          <div
            key={time}
            className="hour-line"
            style={{ top: `${index * 120}px` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="schedule-grid">
      <div className="schedule-header">
        <div className="time-header">Time</div>
        {employees.map(employee => (
          <div key={employee.id} className="employee-column-header">
            {employee.name}
            <div className="time-bank-indicator">
              {calculateUsedHours(employee.id)}/{DAILY_HOURS} hrs
            </div>
          </div>
        ))}
      </div>
      <div className="schedule-content">
        <div className="time-scale">
          {timeSlots.map((time, index) => (
            <div
              key={time}
              className="time-marker"
              style={{ position: 'absolute', top: `${index * 120}px` }}
            >
              {time}
            </div>
          ))}
        </div>
        <div className="schedule-body">
          {renderTimeGrid()}
          {employees.map(employee => (
            <div key={employee.id} className="employee-column">
              {timeSlots.map((timeSlot, index) => {
              const block = timeBlocks.find(b => 
                b.startTime === timeSlot && b.employeeId === employee.id
              )
              return (
                <TimeBlockComponent
                  key={`${timeSlot}-${employee.id}`}
                  block={block || { 
                    id: `${timeSlot}-${employee.id}`, 
                    employeeId: null, 
                    startTime: timeSlot, 
                    endTime: '', 
                    roleRequired: employee.role 
                  }}
                  employee={block ? employee : undefined}
                  onDragStart={() => setDraggingBlock(block || null)}
                  onDrop={() => {
                    if (block && calculateUsedHours(employee.id) < DAILY_HOURS) {
                      handleDrop(block, employee.id)
                    }
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
