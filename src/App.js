import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import EmployeeScheduler from './components/EmployeeScheduler';
import './styles/Scheduler.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <EmployeeScheduler />
      </div>
    </ThemeProvider>
  );
}

export default App;
