import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import EmployeeScheduler from './components/EmployeeScheduler';
import './styles/Scheduler.css';

function App() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider>
      <div className="App" data-theme={isDarkMode ? "dark" : "light"}>
        <header>
          <h1>Employee Scheduler</h1>
          <button onClick={toggleTheme}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </header>
        <main>
          <EmployeeScheduler />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
