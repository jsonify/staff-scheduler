import { TimeBlock, Employee } from '../App'

interface TimeBlockProps {
  block: TimeBlock
  employee: Employee | undefined
  onDragStart: () => void
  onDrop: () => void
}

export default function TimeBlockComponent({ block, employee, onDragStart, onDrop }: TimeBlockProps) {
  return (
    <div
      className={`time-block ${employee ? 'assigned' : ''}`}
      draggable={!!employee}
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="time-range">{block.startTime} - {block.endTime}</div>
      {employee && (
        <div className="employee-info">
          <div>{employee.name}</div>
          <div className="role-badge">{employee.role}</div>
        </div>
      )}
    </div>
  )
}
