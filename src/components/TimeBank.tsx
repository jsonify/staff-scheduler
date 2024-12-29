import { Employee, TimeBlock } from '../App'

interface TimeBankProps {
  employees: Employee[]
  timeBlocks: TimeBlock[]
}

export default function TimeBank({ employees, timeBlocks }: TimeBankProps) {
  // Calculate total available hours
  const totalAvailableHours = employees.reduce((sum, emp) => sum + emp.hoursAvailable, 0)

  // Calculate assigned hours per employee
  const assignedHoursByEmployee = employees.map(employee => {
    const employeeBlocks = timeBlocks.filter(block => block.employeeId === employee.id)
    const assignedHours = employeeBlocks.reduce((total, block) => {
      const [startHour, startMinute] = block.startTime.split(':').map(Number)
      const [endHour, endMinute] = block.endTime.split(':').map(Number)
      const blockDuration = (endHour - startHour) + (endMinute - startMinute) / 60
      return total + blockDuration
    }, 0)
    return { 
      employeeId: employee.id, 
      name: employee.name, 
      assignedHours,
      remainingHours: employee.hoursAvailable - assignedHours 
    }
  })

  // Total assigned hours across all employees
  const totalAssignedHours = assignedHoursByEmployee.reduce((sum, emp) => sum + emp.assignedHours, 0)

  return (
    <div className="time-bank">
      <h2>Time Bank</h2>
      <div className="time-bank-stats">
        <div>Total Available Hours: {totalAvailableHours.toFixed(2)} hrs</div>
        <div>Total Assigned Hours: {totalAssignedHours.toFixed(2)} hrs</div>
        <div>Remaining Total Hours: {(totalAvailableHours - totalAssignedHours).toFixed(2)} hrs</div>
      </div>
      <div className="employee-time-breakdown">
        <h3>Employee Hour Breakdown</h3>
        {assignedHoursByEmployee.map(emp => (
          <div key={emp.employeeId} className="employee-hours">
            <span>{emp.name}: </span>
            <span>Assigned {emp.assignedHours.toFixed(2)} hrs</span>
            <span> (Remaining {emp.remainingHours.toFixed(2)} hrs)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
