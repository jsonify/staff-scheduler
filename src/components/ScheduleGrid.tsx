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

  const handleDrop = (targetBlock: TimeBlock) => {
    if (draggingBlock && draggingBlock.employeeId) {
      const updatedBlocks = timeBlocks.map(block => {
        if (block.id === targetBlock.id) {
          return { ...block, employeeId: draggingBlock.employeeId }
        }
        if (block.id === draggingBlock.id) {
          return { ...block, employeeId: null }
        }
        return block
      })
      setTimeBlocks(updatedBlocks)
    }
    setDraggingBlock(null)
  }

  return (
    <div className="schedule-grid">
      {timeBlocks.map(block => (
        <TimeBlockComponent
          key={block.id}
          block={block}
          employee={employees.find(e => e.id === block.employeeId)}
          onDragStart={() => setDraggingBlock(block)}
          onDrop={() => handleDrop(block)}
        />
      ))}
    </div>
  )
}
