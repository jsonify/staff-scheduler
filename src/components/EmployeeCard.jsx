const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{employee.name}</h2>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {employee.role}
        </span>
        <span className="text-sm font-medium">
          Time Bank: {employee.timeBank} hours
        </span>
      </div>
      {/* Time blocks will be added here */}
    </div>
  )
}

export default EmployeeCard
