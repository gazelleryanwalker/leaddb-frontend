import { Building2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Companies({ apiBaseUrl }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <p className="text-gray-600">Manage your company database</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Company Management</span>
          </CardTitle>
          <CardDescription>
            Add, edit, and manage companies in your database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Companies Module</h3>
            <p className="text-gray-500 mb-4">
              This module allows you to manage your company database with full CRUD operations.
            </p>
            <p className="text-sm text-gray-400">
              API Endpoint: {apiBaseUrl}/api/companies
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

