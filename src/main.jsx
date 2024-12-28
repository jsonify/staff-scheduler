import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log('Starting app...') // Debug log

const rootElement = document.getElementById('root')
if (rootElement) {
  console.log('Found root element:', rootElement) // Debug log
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('Failed to find the root element')
}
