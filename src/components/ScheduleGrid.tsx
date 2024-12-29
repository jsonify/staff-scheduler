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

  // Generate unique time slots
  const timeSlots = [...new Set(timeBlocks.map(block => block.startTime))].sort()

  return (
    <div className="schedule-grid">
      <div className="schedule-header">
        {employees.map(employee => (
          <div key={employee.id} className="employee-column-header">
            {employee.name}
          </div>
        ))}
      </div>
      {timeSlots.map(timeSlot => (
        <div key={timeSlot} className="schedule-row">
          <div className="time-label">{timeSlot}</div>
          {employees.map(employee => {
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
                onDrop={() => block ? handleDrop(block, employee.id) : undefined}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
