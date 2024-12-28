import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log('Starting React app...')

const rootElement = document.getElementById('root')
if (rootElement) {
  console.log('Found root element:', rootElement)
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  console.error('Failed to find root element')
}
