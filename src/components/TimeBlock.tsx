import { TimeBlock, Employee } from '../App'

interface TimeBlockProps {
  block: TimeBlock
  employee: Employee | undefined
  onDragStart: (block: TimeBlock) => void
  onDrop: (e: React.DragEvent) => void
  onBlockClick?: (block: TimeBlock) => void
  style?: React.CSSProperties
}

export default function TimeBlockComponent({ block, employee, onDragStart, onDrop, style }: TimeBlockProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(block))
    onDragStart(block)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDrop(e)
  }

  return (
    <div
      className={`time-block ${employee ? 'assigned' : 'unassigned'}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        ...style,
        position: 'absolute',
        height: '110px',
        margin: '5px',
        width: 'calc(100% - 10px)'
      }}
      onClick={() => onBlockClick?.(block)}
    >
      {employee ? (
        <div className="employee-info">
          <div>{block.title || employee.name}</div>
          <div className="role-badge">{employee.role}</div>
          {block.description && <div className="description">{block.description}</div>}
        </div>
      ) : (
        <div className="empty-block">{block.title || 'Click to Edit'}</div>
      )}
    </div>
  )
}
