import { List } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LeadLists({ apiBaseUrl }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lead Lists</h1>
        <p className="text-gray-600">Organize contacts into targeted lists</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <List className="w-5 h-5" />
            <span>Lead List Management</span>
          </CardTitle>
          <CardDescription>
            Create and manage targeted lead lists for campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <List className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Lead Lists Module</h3>
            <p className="text-gray-500 mb-4">
              This module allows you to organize contacts into targeted lists for specific campaigns.
            </p>
            <p className="text-sm text-gray-400">
              API Endpoint: {apiBaseUrl}/api/lists
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

