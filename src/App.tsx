import { useState } from 'react'
import './App.css'
import ScheduleGrid from './components/ScheduleGrid'
import EmployeeList from './components/EmployeeList'
import TimeBank from './components/TimeBank'
import ThemeToggle from './components/ThemeToggle'

export type Employee = {
  id: string
  name: string
  role: 'teacher' | 'paraeducator'
  hoursAvailable: number
}

export type TimeBlock = {
  id: string
  employeeId: string | null
  startTime: string
  endTime: string
  roleRequired: 'teacher' | 'paraeducator'
  title?: string
  description?: string
}

function App() {
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'John Doe', role: 'teacher', hoursAvailable: 40 },
    { id: '2', name: 'Jane Smith', role: 'paraeducator', hoursAvailable: 30 },
  ])

  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(() => {
    const blocks: TimeBlock[] = []
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const endTime = `${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`
        blocks.push({
          id: `${startTime}-${endTime}`,
          employeeId: null,
          startTime,
          endTime,
          roleRequired: 'teacher',
        })
      }
    }
    return blocks
  })

  return (
    <div className="scheduler-app">
      <ThemeToggle />
      <h1 className="animated-text">Employee Scheduler</h1>
      <div className="scheduler-container">
        <EmployeeList employees={employees} />
        <ScheduleGrid 
          timeBlocks={timeBlocks} 
          setTimeBlocks={setTimeBlocks}
          employees={employees}
          onBlockClick={(block) => {
            setSelectedBlock(block)
            setIsModalOpen(true)
          }}
        />
        <TimeBlockModal
          block={selectedBlock}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedBlock) => {
            setTimeBlocks(timeBlocks.map(block => 
              block.id === updatedBlock.id ? updatedBlock : block
            ))
          }}
        />
        <TimeBank 
          employees={employees} 
          timeBlocks={timeBlocks}
        />
      </div>
    </div>
  )
}

export default App
