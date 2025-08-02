import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Companies from './components/Companies'
import Contacts from './components/Contacts'
import LeadLists from './components/LeadLists'
import Export from './components/Export'
import LeadGeneration from './components/LeadGeneration'
import './App.css'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [apiStatus, setApiStatus] = useState('checking')

  // Check API connection on startup
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/health`)
        if (response.ok) {
          setApiStatus('connected')
        } else {
          setApiStatus('error')
        }
      } catch (error) {
        setApiStatus('error')
      }
    }

    checkApiConnection()
  }, [])

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          apiStatus={apiStatus}
        />
        
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-16'
        }`}>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard apiBaseUrl={API_BASE_URL} />} />
              <Route path="/companies" element={<Companies apiBaseUrl={API_BASE_URL} />} />
              <Route path="/contacts" element={<Contacts apiBaseUrl={API_BASE_URL} />} />
              <Route path="/lead-lists" element={<LeadLists apiBaseUrl={API_BASE_URL} />} />
              <Route path="/lead-generation" element={<LeadGeneration apiBaseUrl={API_BASE_URL} />} />
              <Route path="/export" element={<Export apiBaseUrl={API_BASE_URL} />} />
            </Routes>
          </main>
        </div>
        
        <Toaster />
      </div>
    </Router>
  )
}

export default App

