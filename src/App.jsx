import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
console.log('LeadDB API URL:', API_BASE_URL)

// Navigation Component
function Navigation({ currentPage, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'companies', label: '🏢 Companies' },
    { id: 'contacts', label: '👥 Contacts' },
    { id: 'lead-generation', label: '🔍 Lead Generation' },
    { id: 'lead-lists', label: '📋 Lead Lists' },
    { id: 'export', label: '📤 Export' }
  ]
  
  const handleNavClick = (pageId) => {
    onNavigate(pageId)
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          display: 'block',
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1001,
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '18px'
        }}
        className="mobile-menu-btn"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      
      {/* Desktop Navigation */}
      <nav style={{ 
        backgroundColor: '#2c3e50', 
        padding: '20px', 
        minHeight: '100vh',
        width: '250px',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'block'
      }} className="desktop-nav">
        <h2 style={{ color: 'white', marginBottom: '30px' }}>🚀 LeadDB</h2>
        {navItems.map(item => (
          <div 
            key={item.id}
            onClick={() => handleNavClick(item.id)}
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
      
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav style={{ 
            backgroundColor: '#2c3e50', 
            padding: '20px', 
            minHeight: '100vh',
            width: '280px',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1000,
            transform: 'translateX(0)',
            transition: 'transform 0.3s ease'
          }} className="mobile-nav">
            <h2 style={{ color: 'white', marginBottom: '30px', marginTop: '40px' }}>🚀 LeadDB</h2>
            {navItems.map(item => (
              <div 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '12px 16px',
                  margin: '8px 0',
                  backgroundColor: currentPage === item.id ? '#34495e' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </>
      )}
    </>
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

// Lead Lists Component
function LeadLists() {
  const [leadLists, setLeadLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [newListName, setNewListName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  useEffect(() => {
    const fetchLeadLists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/lists`)
        if (response.ok) {
          const data = await response.json()
          setLeadLists(data.lists || [])
        }
      } catch (error) {
        console.error('Error fetching lead lists:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLeadLists()
  }, [])
  
  const createNewList = async () => {
    if (!newListName.trim()) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newListName,
          description: `Lead list created on ${new Date().toLocaleDateString()}`
        })
      })
      
      if (response.ok) {
        const newList = await response.json()
        setLeadLists([...leadLists, newList])
        setNewListName('')
        setShowCreateForm(false)
      }
    } catch (error) {
      console.error('Error creating lead list:', error)
    }
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>📋 Lead Lists</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Create New List
        </button>
      </div>
      
      {showCreateForm && (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h3>Create New Lead List</h3>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <input
              type="text"
              placeholder="List name (e.g., Q1 Prospects)"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button
              onClick={createNewList}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {loading ? (
        <p>Loading lead lists...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {leadLists.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <h3>No Lead Lists Yet</h3>
              <p>Create your first lead list to organize your prospects and campaigns.</p>
              <button
                onClick={() => setShowCreateForm(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Create First List
              </button>
            </div>
          ) : (
            leadLists.map((list, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{list.name}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#666' }}>{list.description || 'No description'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#666', fontSize: '14px' }}>
                    {list.contact_count || 0} contacts
                  </span>
                  <button
                    style={{
                      padding: '5px 15px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    View List
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// Export Component
function Export() {
  const [exportType, setExportType] = useState('contacts')
  const [exportFormat, setExportFormat] = useState('csv')
  const [crmPlatform, setCrmPlatform] = useState('zoho')
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState('')
  
  const handleExport = async () => {
    setIsExporting(true)
    setExportStatus('Preparing export...')
    
    try {
      const endpoint = exportType === 'contacts' ? '/api/export/contacts' : '/api/export/companies'
      const params = new URLSearchParams({
        format: exportFormat,
        platform: crmPlatform
      })
      
      setExportStatus('Fetching data...')
      const response = await fetch(`${API_BASE_URL}${endpoint}?${params}`)
      
      if (response.ok) {
        setExportStatus('Downloading file...')
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `leaddb_${exportType}_${new Date().toISOString().split('T')[0]}.${exportFormat}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        setExportStatus('Export completed successfully!')
      } else {
        setExportStatus('Export failed. Please try again.')
      }
    } catch (error) {
      console.error('Export error:', error)
      setExportStatus('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
      setTimeout(() => setExportStatus(''), 3000)
    }
  }
  
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>📤 Export Data</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Export Configuration */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>Export Configuration</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data Type:</label>
            <select 
              value={exportType} 
              onChange={(e) => setExportType(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="contacts">Contacts</option>
              <option value="companies">Companies</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Export Format:</label>
            <select 
              value={exportFormat} 
              onChange={(e) => setExportFormat(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="csv">CSV (Excel Compatible)</option>
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="json">JSON</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>CRM Platform:</label>
            <select 
              value={crmPlatform} 
              onChange={(e) => setCrmPlatform(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="zoho">Zoho CRM</option>
              <option value="hubspot">HubSpot</option>
              <option value="salesforce">Salesforce</option>
              <option value="pipedrive">Pipedrive</option>
              <option value="generic">Generic Format</option>
            </select>
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isExporting ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isExporting ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {isExporting ? 'Exporting...' : `📤 Export ${exportType.charAt(0).toUpperCase() + exportType.slice(1)}`}
          </button>
          
          {exportStatus && (
            <div style={{ 
              marginTop: '15px', 
              padding: '10px', 
              backgroundColor: exportStatus.includes('failed') ? '#f8d7da' : '#d4edda',
              border: `1px solid ${exportStatus.includes('failed') ? '#f5c6cb' : '#c3e6cb'}`,
              borderRadius: '4px',
              color: exportStatus.includes('failed') ? '#721c24' : '#155724'
            }}>
              {exportStatus}
            </div>
          )}
        </div>
        
        {/* Export Instructions */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>📝 Export Instructions</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <h4>How to Use:</h4>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>Select the data type you want to export (Contacts or Companies)</li>
              <li>Choose your preferred export format (CSV, Excel, or JSON)</li>
              <li>Select your CRM platform for optimized field mapping</li>
              <li>Click the Export button to download your file</li>
            </ol>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <h4>CRM Import Tips:</h4>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Zoho CRM:</strong> Use CSV format with standard field mapping</li>
              <li><strong>HubSpot:</strong> Excel format works best for bulk imports</li>
              <li><strong>Salesforce:</strong> CSV format with custom field mapping</li>
              <li><strong>Pipedrive:</strong> Use generic CSV format</li>
            </ul>
          </div>
          
          <div style={{ padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px', border: '1px solid #b3d9ff' }}>
            <strong>💡 Pro Tip:</strong> Always review your exported data before importing into your CRM to ensure field mappings are correct.
          </div>
        </div>
      </div>
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
        return <LeadLists />
      case 'export':
        return <Export />
      default:
        return <Dashboard apiStatus={apiStatus} />
    }
  }
  
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .main-content {
            margin-left: 0 !important;
            padding-top: 70px;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .main-content {
            margin-left: 250px !important;
            padding-top: 0;
          }
        }
      `}</style>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="main-content" style={{ marginLeft: '250px' }}>
        {renderPage()}
      </div>
    </div>
  )
}

export default App

/* Force production deployment */
