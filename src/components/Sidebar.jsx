import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  List, 
  Zap, 
  Download, 
  Menu,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Lead Lists', href: '/lead-lists', icon: List },
  { name: 'Lead Generation', href: '/lead-generation', icon: Zap },
  { name: 'Export', href: '/export', icon: Download },
]

const getApiStatusBadge = (status) => {
  switch (status) {
    case 'connected':
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Connected
        </Badge>
      )
    case 'error':
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="w-3 h-3 mr-1" />
          Disconnected
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          <Clock className="w-3 h-3 mr-1" />
          Checking...
        </Badge>
      )
  }
}

export default function Sidebar({ isOpen, onToggle, apiStatus }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className={`flex items-center ${isOpen ? '' : 'justify-center'}`}>
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">LeadDB</h1>
                <p className="text-xs text-gray-500">Lead Database System</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* API Status */}
        {isOpen && (
          <div className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">API Status</span>
              {getApiStatusBadge(apiStatus)}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${isOpen ? '' : 'justify-center'}`}
              >
                <item.icon
                  className={`flex-shrink-0 w-5 h-5 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500">
              <p>LeadDB v1.0.0</p>
              <p>Apollo.io Alternative</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

