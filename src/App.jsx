import { useState, useEffect } from 'react'

// Minimal error-catching version
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Log everything for debugging
console.log('=== LEADDB DEBUG START ===')
console.log('Environment check:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_BASE_URL,
  allEnvVars: import.meta.env
})
console.log('React loaded successfully')
console.log('=== LEADDB DEBUG END ===')

function App() {
  console.log('App function called')
  
  try {
    console.log('Attempting to render minimal app')
    
    return (
      <div style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>LeadDB Debug Test</h1>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginBottom: '15px' }}>
          <h2>Environment Variables:</h2>
          <p><strong>VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}</p>
          <p><strong>API_BASE_URL:</strong> {API_BASE_URL}</p>
          <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px' }}>
          <h2>Status:</h2>
          <p style={{ color: 'green' }}>✅ React is working</p>
          <p style={{ color: 'green' }}>✅ App component rendered</p>
          <p style={{ color: 'green' }}>✅ Environment variables accessible</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '5px', marginTop: '15px' }}>
          <h2>Next Steps:</h2>
          <p>If you can see this page, React is working. Check browser console for debug logs.</p>
          <p>API URL: <a href={`${API_BASE_URL}/health`} target="_blank" rel="noopener noreferrer">{API_BASE_URL}/health</a></p>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial, sans-serif' }}>
        <h1>Error in LeadDB App</h1>
        <p>Error: {error.message}</p>
        <p>Check browser console for more details.</p>
      </div>
    )
  }
}

export default App

/* Force production deployment */
