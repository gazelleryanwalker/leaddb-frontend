import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
console.log('LeadDB API URL:', API_BASE_URL)

// Navigation Component
function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'companies', label: '🏢 Companies' },
    { id: 'contacts', label: '👥 Contacts' },
    { id: 'lead-generation', label: '🔍 Lead Generation' },
    { id: 'lead-lists', label: '📋 Lead Lists' },
    { id: 'export', label: '📤 Export' }
  ]
  
  return (
    <nav style={{ 
      backgroundColor: '#2c3e50', 
      padding: '20px', 
      minHeight: '100vh',
      width: '250px',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <h2 style={{ color: 'white', marginBottom: '30px' }}>🚀 LeadDB</h2>
      {navItems.map(item => (
        <div 
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            padding: '12px 16px',
            margin: '8px 0',
            backgroundColor: currentPage === item.id ? '#34495e' : 'transparent',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
          onMouseOut={(e) => e.target.style.backgroundColor = currentPage === item.id ? '#34495e' : 'transparent'}
        >
          {item.label}
        </div>
      ))}
    </nav>
  )
}

// Dashboard Component
function Dashboard({ apiStatus }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🚀 LeadDB Dashboard</h1>
      
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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>📊 Quick Stats</h3>
          <p>Total Companies: Loading...</p>
          <p>Total Contacts: Loading...</p>
          <p>Active Campaigns: Loading...</p>
        </div>
      </div>
    </div>
  )
}

// Companies Component
function Companies() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/companies`)
        if (response.ok) {
          const data = await response.json()
          // Handle the API response format: {companies: [], total: 0, ...}
          setCompanies(data.companies || [])
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])
  
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🏢 Companies</h1>
      
      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
            <h3>Company Database ({companies.length} companies)</h3>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {companies.map((company, index) => (
              <div key={index} style={{ 
                padding: '16px 20px', 
                borderBottom: '1px solid #eee',
                ':hover': { backgroundColor: '#f8f9fa' }
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{company.name}</h4>
                <p style={{ margin: '4px 0', color: '#666' }}>Industry: {company.industry || 'N/A'}</p>
                <p style={{ margin: '4px 0', color: '#666' }}>Size: {company.size || 'N/A'}</p>
                <p style={{ margin: '4px 0', color: '#666' }}>Location: {company.location || 'N/A'}</p>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" 
                     style={{ color: '#007bff', textDecoration: 'none' }}>
                    🌐 {company.website}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Contacts Component
function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/contacts`)
        if (response.ok) {
          const data = await response.json()
          // Handle the API response format: {contacts: [], total: 0, ...}
          setContacts(data.contacts || [])
        }
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContacts()
  }, [])
  
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>👥 Contacts</h1>
      
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
            <h3>Contact Database ({contacts.length} contacts)</h3>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {contacts.map((contact, index) => (
              <div key={index} style={{ 
                padding: '16px 20px', 
                borderBottom: '1px solid #eee',
                ':hover': { backgroundColor: '#f8f9fa' }
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{contact.first_name} {contact.last_name}</h4>
                <p style={{ margin: '4px 0', color: '#666' }}>📧 {contact.email}</p>
                <p style={{ margin: '4px 0', color: '#666' }}>💼 {contact.title || 'N/A'}</p>
                <p style={{ margin: '4px 0', color: '#666' }}>🏢 {contact.company_name || 'N/A'}</p>
                {contact.phone && (
                  <p style={{ margin: '4px 0', color: '#666' }}>📞 {contact.phone}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Lead Generation Component
function LeadGeneration() {
  const [searchParams, setSearchParams] = useState({ industry: '', location: '', size: '' })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchParams.industry) params.append('industry', searchParams.industry)
      if (searchParams.location) params.append('location', searchParams.location)
      if (searchParams.size) params.append('size', searchParams.size)
      
      const response = await fetch(`${API_BASE_URL}/api/companies/search?${params}`)
      if (response.ok) {
        const data = await response.json()
        // Handle the API response format: {companies: [], total: 0, ...}
        setResults(data.companies || [])
      }
    } catch (error) {
      console.error('Error searching leads:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>🔍 Lead Generation</h1>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h3>Search for Prospects</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
          <input
            type="text"
            placeholder="Industry (e.g., Technology)"
            value={searchParams.industry}
            onChange={(e) => setSearchParams({...searchParams, industry: e.target.value})}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Location (e.g., San Francisco)"
            value={searchParams.location}
            onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type="text"
            placeholder="Company Size (e.g., 100-500)"
            value={searchParams.size}
            onChange={(e) => setSearchParams({...searchParams, size: e.target.value})}
            style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Searching...' : '🔍 Search'}
          </button>
        </div>
      </div>
      
      {results.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
            <h3>Search Results ({results.length} prospects found)</h3>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {results.map((company, index) => (
              <div key={index} style={{ 
                padding: '16px 20px', 
                borderBottom: '1px solid #eee'
              }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{company.name}</h4>
                <p style={{ margin: '4px 0', color: '#666' }}>Industry: {company.industry || 'N/A'}</p>
                <p style={{ margin: '4px 0', color: '#666' }}>Size: {company.size || 'N/A'}</p>
                <p style={{ margin: '4px 0', color: '#666' }}>Location: {company.location || 'N/A'}</p>
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer" 
                     style={{ color: '#007bff', textDecoration: 'none' }}>
                    🌐 {company.website}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [apiStatus, setApiStatus] = useState('checking')
  
  // Check API status
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
  
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard apiStatus={apiStatus} />
      case 'companies':
        return <Companies />
      case 'contacts':
        return <Contacts />
      case 'lead-generation':
        return <LeadGeneration />
      case 'lead-lists':
        return <div style={{ padding: '20px' }}><h1>📋 Lead Lists</h1><p>Lead list management coming soon...</p></div>
      case 'export':
        return <div style={{ padding: '20px' }}><h1>📤 Export</h1><p>CRM export tools coming soon...</p></div>
      default:
        return <Dashboard apiStatus={apiStatus} />
    }
  }
  
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <div style={{ marginLeft: '250px' }}>
        {renderPage()}
      </div>
    </div>
  )
}

export default App

/* Force production deployment */
