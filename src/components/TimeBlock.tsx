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
      className={`time-block ${employee ? 'assigned' : 'unassigned'}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {employee ? (
        <div className="employee-info">
          <div className="role-badge">{employee.role}</div>
        </div>
      ) : (
        <div className="empty-block">Open</div>
      )}
    </div>
  )
}
