import { useState } from 'react'
import EmployeeCard from './EmployeeCard'

const Scheduler = () => {
  const [employees] = useState([
    { id: 1, name: 'John Doe', role: 'Teacher', timeBank: 8 },
    { id: 2, name: 'Jane Smith', role: 'Para-educator', timeBank: 6 }
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {employees.map(employee => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  )
}

export default Scheduler
