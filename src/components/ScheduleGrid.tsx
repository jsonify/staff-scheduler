import { useState } from 'react'
import { TimeBlock, Employee } from '../App'
import TimeBlockComponent from './TimeBlock'

interface ScheduleGridProps {
  timeBlocks: TimeBlock[]
  setTimeBlocks: (blocks: TimeBlock[]) => void
  employees: Employee[]
  onBlockClick?: (block: TimeBlock) => void
}

export default function ScheduleGrid({ timeBlocks, setTimeBlocks, employees, onBlockClick }: ScheduleGridProps) {
  const [draggingBlock, setDraggingBlock] = useState<TimeBlock | null>(null)

  const handleDrop = (e: React.DragEvent, employeeId: string, timeSlot: string) => {
    e.preventDefault()
    const draggedBlockData = e.dataTransfer.getData('text/plain')
    if (!draggedBlockData) return

    const draggedBlock = JSON.parse(draggedBlockData) as TimeBlock
    
    // Check if the employee has available hours
    if (calculateUsedHours(employeeId) >= DAILY_HOURS && draggedBlock.employeeId !== employeeId) {
      return
    }

    const updatedBlocks = timeBlocks.map(block => {
      // Clear the previous assignment
      if (block.id === draggedBlock.id) {
        return { ...block, employeeId: null }
      }
      // Create new assignment
      if (block.startTime === timeSlot && block.employeeId === employeeId) {
        return { ...block, employeeId: employeeId }
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
                  onDragStart={(block) => setDraggingBlock(block)}
                  onDrop={(e) => handleDrop(e, employee.id, timeSlot)}
                  onBlockClick={onBlockClick}
                  style={{ top: `${index * 120}px` }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
