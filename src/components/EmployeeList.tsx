import { Employee } from '../App'

interface EmployeeListProps {
  employees: Employee[]
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <div className="employee-list">
      <h2>Employees</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id} className="employee-item">
            <div className="employee-name">{employee.name}</div>
            <div className={`role-badge ${employee.role}`}>{employee.role}</div>
            <div className="hours-available">{employee.hoursAvailable} hrs available</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
