import { useState } from 'react'
import { Download, FileText, Table, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export default function Export({ apiBaseUrl }) {
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    has_email: true,
    has_phone: false,
    min_score: 0
  })
  const [exportFormat, setExportFormat] = useState('zoho')
  const { toast } = useToast()

  const handleExport = async (type) => {
    setLoading(true)
    try {
      const endpoint = type === 'contacts' ? '/api/export/contacts/csv' : '/api/export/companies/csv'
      const payload = {
        filters,
        zoho_format: exportFormat === 'zoho'
      }

      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const data = await response.json()
      
      // Create and download file
      const blob = new Blob([data.csv_data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = data.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Export Successful",
        description: `Exported ${data.total_contacts || data.total_companies} records to ${data.filename}`,
      })

    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadTemplate = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/export/zoho-template`)
      const data = await response.json()
      
      const blob = new Blob([data.csv_data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = data.filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Template Downloaded",
        description: "Zoho CRM import template downloaded successfully",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download template",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Export Data</h1>
        <p className="text-gray-600">Export your leads for CRM integration</p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Export Filters</CardTitle>
            <CardDescription>
              Choose which contacts to include
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="has_email"
                checked={filters.has_email}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, has_email: checked }))
                }
              />
              <label htmlFor="has_email" className="text-sm">
                Only contacts with email
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="has_phone"
                checked={filters.has_phone}
                onCheckedChange={(checked) => 
                  setFilters(prev => ({ ...prev, has_phone: checked }))
                }
              />
              <label htmlFor="has_phone" className="text-sm">
                Only contacts with phone
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Lead Score</label>
              <Select 
                value={filters.min_score.toString()} 
                onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, min_score: parseInt(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Score</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="70">70+</SelectItem>
                  <SelectItem value="80">80+</SelectItem>
                  <SelectItem value="90">90+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zoho">Zoho CRM Format</SelectItem>
                  <SelectItem value="hubspot">HubSpot Format</SelectItem>
                  <SelectItem value="standard">Standard CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Export Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Export Contacts</CardTitle>
            <CardDescription>
              Export contacts for email marketing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => handleExport('contacts')}
              disabled={loading}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? 'Exporting...' : 'Export Contacts'}
            </Button>

            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">
                <FileText className="w-3 h-3 mr-1" />
                CSV Format
              </Badge>
              <p className="text-xs text-gray-500 text-center">
                Compatible with Zoho CRM, HubSpot, and other CRM systems
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Export Companies */}
        <Card>
          <CardHeader>
            <CardTitle>Export Companies</CardTitle>
            <CardDescription>
              Export company database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => handleExport('companies')}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              <Table className="w-4 h-4 mr-2" />
              Export Companies
            </Button>

            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">
                <FileText className="w-3 h-3 mr-1" />
                CSV Format
              </Badge>
              <p className="text-xs text-gray-500 text-center">
                Company information and details
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CRM Integration Guide */}
      <Card>
        <CardHeader>
          <CardTitle>CRM Integration Guide</CardTitle>
          <CardDescription>
            Step-by-step instructions for importing into popular CRM systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zoho CRM */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold">Zoho CRM</h3>
              </div>
              <ol className="text-sm space-y-1 text-gray-600">
                <li>1. Export contacts using "Zoho CRM Format"</li>
                <li>2. In Zoho CRM, go to Contacts → Import</li>
                <li>3. Upload the downloaded CSV file</li>
                <li>4. Map fields (auto-detected)</li>
                <li>5. Complete the import process</li>
              </ol>
              <Button 
                variant="outline" 
                size="sm"
                onClick={downloadTemplate}
              >
                Download Template
              </Button>
            </div>

            {/* HubSpot */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-orange-500 rounded"></div>
                <h3 className="font-semibold">HubSpot</h3>
              </div>
              <ol className="text-sm space-y-1 text-gray-600">
                <li>1. Export contacts using "HubSpot Format"</li>
                <li>2. In HubSpot, go to Contacts → Import</li>
                <li>3. Choose "File from computer"</li>
                <li>4. Upload CSV and map properties</li>
                <li>5. Review and start import</li>
              </ol>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExport('contacts')}
              >
                Export for HubSpot
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Field Mapping Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Field Mapping Reference</CardTitle>
          <CardDescription>
            How LeadDB fields map to CRM fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">LeadDB Field</th>
                  <th className="text-left py-2">Zoho CRM Field</th>
                  <th className="text-left py-2">HubSpot Field</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr className="border-b">
                  <td className="py-2">first_name</td>
                  <td className="py-2">First Name</td>
                  <td className="py-2">First Name</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">last_name</td>
                  <td className="py-2">Last Name</td>
                  <td className="py-2">Last Name</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">email</td>
                  <td className="py-2">Email</td>
                  <td className="py-2">Email</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">job_title</td>
                  <td className="py-2">Title</td>
                  <td className="py-2">Job Title</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">company_name</td>
                  <td className="py-2">Account Name</td>
                  <td className="py-2">Company Name</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">phone</td>
                  <td className="py-2">Phone/Mobile</td>
                  <td className="py-2">Phone Number</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

