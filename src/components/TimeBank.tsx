import { Employee } from '../App'

interface TimeBankProps {
  employees: Employee[]
}

export default function TimeBank({ employees }: TimeBankProps) {
  const totalHours = employees.reduce((sum, emp) => sum + emp.hoursAvailable, 0)
  const assignedHours = 0 // TODO: Calculate based on schedule

  return (
    <div className="time-bank">
      <h2>Time Bank</h2>
      <div className="time-bank-stats">
        <div>Total Available: {totalHours} hrs</div>
        <div>Assigned: {assignedHours} hrs</div>
        <div>Remaining: {totalHours - assignedHours} hrs</div>
      </div>
    </div>
  )
}
