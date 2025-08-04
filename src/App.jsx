import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
console.log('LeadDB API URL:', API_BASE_URL)

// Simple Dashboard Component
function Dashboard() {
  const [apiStatus, setApiStatus] = useState('checking')
  
  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`)
        setApiStatus(response.ok ? 'connected' : 'error')
      } catch (error) {
        setApiStatus('error')
      }
    }
    checkApi()
  }, [])
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🚀 LeadDB - Apollo.io Alternative</h1>
      
      <div style={{ 
        backgroundColor: apiStatus === 'connected' ? '#d4edda' : '#f8d7da', 
        padding: '15px', 
        borderRadius: '5px', 
        marginBottom: '20px',
        border: `1px solid ${apiStatus === 'connected' ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        <h3>API Status: {apiStatus === 'connected' ? '✅ Connected' : apiStatus === 'checking' ? '🔄 Checking...' : '❌ Error'}</h3>
        <p>Backend: {API_BASE_URL}</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>🔍 Lead Generation</h3>
          <p>Find prospects by industry and location</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>🏢 Companies</h3>
          <p>Manage company database</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>👥 Contacts</h3>
          <p>Lead scoring and management</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>📋 Lead Lists</h3>
          <p>Organize campaigns</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>📤 CRM Export</h3>
          <p>Export to Zoho/HubSpot</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>📊 Analytics</h3>
          <p>Performance metrics</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

/* Force production deployment */
