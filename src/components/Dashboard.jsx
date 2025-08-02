import { useState, useEffect } from 'react'
import { 
  Building2, 
  Users, 
  List, 
  TrendingUp,
  Mail,
  Phone,
  Globe,
  Target
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Dashboard({ apiBaseUrl }) {
  const [stats, setStats] = useState({
    companies: { total: 0, loading: true },
    contacts: { total: 0, withEmail: 0, withPhone: 0, loading: true },
    lists: { total: 0, loading: true }
  })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [apiBaseUrl])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch companies stats
      const companiesResponse = await fetch(`${apiBaseUrl}/api/companies?per_page=1`)
      const companiesData = await companiesResponse.json()
      
      // Fetch contacts stats
      const contactsResponse = await fetch(`${apiBaseUrl}/api/contacts?per_page=1`)
      const contactsData = await contactsResponse.json()
      
      // Fetch contacts with email
      const emailContactsResponse = await fetch(`${apiBaseUrl}/api/contacts?has_email=true&per_page=1`)
      const emailContactsData = await emailContactsResponse.json()
      
      // Fetch contacts with phone
      const phoneContactsResponse = await fetch(`${apiBaseUrl}/api/contacts?has_phone=true&per_page=1`)
      const phoneContactsData = await phoneContactsResponse.json()
      
      // Fetch lists stats
      const listsResponse = await fetch(`${apiBaseUrl}/api/lists`)
      const listsData = await listsResponse.json()
      
      // Fetch recent contacts
      const recentContactsResponse = await fetch(`${apiBaseUrl}/api/contacts?per_page=5&sort=created_at&order=desc`)
      const recentContactsData = await recentContactsResponse.json()
      
      setStats({
        companies: { 
          total: companiesData.total || 0, 
          loading: false 
        },
        contacts: { 
          total: contactsData.total || 0,
          withEmail: emailContactsData.total || 0,
          withPhone: phoneContactsData.total || 0,
          loading: false 
        },
        lists: { 
          total: listsData.lists?.length || 0, 
          loading: false 
        }
      })
      
      setRecentContacts(recentContactsData.contacts || [])
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Companies',
      value: stats.companies.total,
      icon: Building2,
      description: 'Companies in database',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      loading: stats.companies.loading
    },
    {
      title: 'Total Contacts',
      value: stats.contacts.total,
      icon: Users,
      description: 'Contacts in database',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      loading: stats.contacts.loading
    },
    {
      title: 'Contacts with Email',
      value: stats.contacts.withEmail,
      icon: Mail,
      description: 'Ready for email campaigns',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      loading: stats.contacts.loading
    },
    {
      title: 'Lead Lists',
      value: stats.lists.total,
      icon: List,
      description: 'Organized lead lists',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      loading: stats.lists.loading
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your lead database system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.loading ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                ) : (
                  stat.value.toLocaleString()
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get started with your lead database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/lead-generation">
              <Button className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                <Zap className="w-6 h-6" />
                <span>Generate Leads</span>
                <span className="text-xs opacity-75">Find new prospects</span>
              </Button>
            </Link>
            
            <Link to="/companies">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                <Building2 className="w-6 h-6" />
                <span>Add Company</span>
                <span className="text-xs opacity-75">Manual entry</span>
              </Button>
            </Link>
            
            <Link to="/export">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center space-y-2">
                <Download className="w-6 h-6" />
                <span>Export Data</span>
                <span className="text-xs opacity-75">For CRM import</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contacts</CardTitle>
          <CardDescription>
            Latest contacts added to your database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentContacts.length > 0 ? (
            <div className="space-y-4">
              {recentContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {contact.first_name} {contact.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {contact.job_title} at {contact.company_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {contact.email && (
                      <Badge variant="outline" className="text-xs">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Badge>
                    )}
                    {contact.phone && (
                      <Badge variant="outline" className="text-xs">
                        <Phone className="w-3 h-3 mr-1" />
                        Phone
                      </Badge>
                    )}
                    {contact.lead_score && (
                      <Badge variant="outline" className="text-xs">
                        <Target className="w-3 h-3 mr-1" />
                        {contact.lead_score}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No contacts yet</p>
              <p className="text-sm text-gray-400">Start by generating leads or adding companies</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Quality Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Quality</CardTitle>
            <CardDescription>
              Contact data completeness overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Contacts with Email</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">{stats.contacts.withEmail}</span>
                  <span className="text-gray-500 text-sm ml-1">
                    ({stats.contacts.total > 0 ? Math.round((stats.contacts.withEmail / stats.contacts.total) * 100) : 0}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Contacts with Phone</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">{stats.contacts.withPhone}</span>
                  <span className="text-gray-500 text-sm ml-1">
                    ({stats.contacts.total > 0 ? Math.round((stats.contacts.withPhone / stats.contacts.total) * 100) : 0}%)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Tips to maximize your lead database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Generate Industry Leads</p>
                  <p className="text-xs text-gray-500">Use the Lead Generation tool to find prospects by industry</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-green-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Organize into Lists</p>
                  <p className="text-xs text-gray-500">Create targeted lists for specific campaigns</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-purple-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Export to CRM</p>
                  <p className="text-xs text-gray-500">Export data in Zoho CRM or HubSpot format</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

