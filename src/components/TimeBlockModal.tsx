import { TimeBlock } from '../App'

interface TimeBlockModalProps {
  block: TimeBlock | null
  isOpen: boolean
  onClose: () => void
  onSave: (block: TimeBlock) => void
}

export default function TimeBlockModal({ block, isOpen, onClose, onSave }: TimeBlockModalProps) {
  if (!isOpen || !block) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const updatedBlock = {
      ...block,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      roleRequired: formData.get('roleRequired') as 'teacher' | 'paraeducator'
    }
    onSave(updatedBlock)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Time Block</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={block.title || ''}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={block.description || ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleRequired">Role Required</label>
            <select
              id="roleRequired"
              name="roleRequired"
              defaultValue={block.roleRequired}
            >
              <option value="teacher">Teacher</option>
              <option value="paraeducator">Paraeducator</option>
            </select>
          </div>
          <div className="form-group">
            <label>Time: {block.startTime} - {block.endTime}</label>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
