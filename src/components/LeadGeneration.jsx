import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Loader2, Search, Users, Building, Mail, Phone, Linkedin, Globe, Target, Zap } from 'lucide-react';

const LeadGeneration = ({ apiBaseUrl }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLeads, setGeneratedLeads] = useState(null);
  const [formData, setFormData] = useState({
    industry: '',
    location: '',
    company_size: '',
    limit: 50,
    use_real_data: true
  });

  const industries = [
    'Technology',
    'Marketing',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Real Estate',
    'Consulting',
    'E-commerce'
  ];

  const companySizes = [
    '1-10',
    '10-50',
    '50-100',
    '100-500',
    '500+'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateLeads = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/leads/generate/industry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLeads(data);
      } else {
        console.error('Failed to generate leads');
      }
    } catch (error) {
      console.error('Error generating leads:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveLeadsToDatabase = async () => {
    if (!generatedLeads) return;

    try {
      // Save companies
      for (const company of generatedLeads.companies) {
        await fetch(`${apiBaseUrl}/api/companies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(company)
        });
      }

      // Save contacts
      for (const contact of generatedLeads.contacts) {
        await fetch(`${apiBaseUrl}/api/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact)
        });
      }

      alert('Leads saved to database successfully!');
    } catch (error) {
      console.error('Error saving leads:', error);
      alert('Error saving leads to database');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Target className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Lead Generation</h1>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Zap className="h-3 w-3 mr-1" />
          FREE Real Data
        </Badge>
      </div>

      {/* Lead Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Generate Real Leads</span>
          </CardTitle>
          <CardDescription>
            Find companies and contacts using free web scraping and email generation. 
            No API costs - generates real, verified leads from public sources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Industry Selection */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>

            {/* Company Size */}
            <div className="space-y-2">
              <Label htmlFor="company_size">Company Size</Label>
              <Select value={formData.company_size} onValueChange={(value) => handleInputChange('company_size', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Any size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size} employees
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Limit */}
            <div className="space-y-2">
              <Label htmlFor="limit">Number of Leads</Label>
              <Input
                id="limit"
                type="number"
                min="1"
                max="100"
                value={formData.limit}
                onChange={(e) => handleInputChange('limit', parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Data Source Options */}
          <div className="space-y-3">
            <Label>Data Source</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="use_real_data"
                checked={formData.use_real_data}
                onCheckedChange={(checked) => handleInputChange('use_real_data', checked)}
              />
              <Label htmlFor="use_real_data" className="text-sm">
                Use real web scraping (recommended)
              </Label>
            </div>
            <p className="text-xs text-gray-500">
              {formData.use_real_data 
                ? "✅ Will scrape real companies and generate verified emails from public sources"
                : "⚠️ Will use sample data for testing purposes"
              }
            </p>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateLeads} 
            disabled={!formData.industry || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Leads...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Generate Leads
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {generatedLeads && (
        <div className="space-y-6">
          {/* Results Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Generation Results</CardTitle>
              <CardDescription>
                Found {generatedLeads.total_companies} companies with {generatedLeads.total_contacts} contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{generatedLeads.total_companies}</p>
                    <p className="text-sm text-gray-500">Companies</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{generatedLeads.total_contacts}</p>
                    <p className="text-sm text-gray-500">Contacts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {generatedLeads.contacts.filter(c => c.email).length}
                    </p>
                    <p className="text-sm text-gray-500">With Emails</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={saveLeadsToDatabase} className="mr-2">
                  Save to Database
                </Button>
                <Badge variant="outline">
                  Source: {generatedLeads.search_criteria.data_source}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Companies Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Companies Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedLeads.companies.slice(0, 5).map((company, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{company.name}</h3>
                        <p className="text-sm text-gray-500">{company.industry}</p>
                        <p className="text-sm text-gray-500">
                          {company.location_city}, {company.location_state}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{company.company_size} employees</Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {company.contact_count || 0} contacts
                        </p>
                      </div>
                    </div>
                    
                    {company.website && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {company.website}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
                
                {generatedLeads.companies.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    ... and {generatedLeads.companies.length - 5} more companies
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contacts Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Contacts Found</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedLeads.contacts.slice(0, 10).map((contact, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {contact.first_name} {contact.last_name}
                        </h3>
                        <p className="text-sm text-gray-600">{contact.job_title}</p>
                        <p className="text-sm text-gray-500">{contact.company_name}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          Score: {contact.lead_score}/100
                        </Badge>
                        {contact.email_confidence && (
                          <p className="text-xs text-gray-500 mt-1">
                            Email: {contact.email_confidence}% confidence
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {contact.email && (
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{contact.email}</span>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{contact.phone}</span>
                        </div>
                      )}
                      {contact.linkedin_url && (
                        <div className="flex items-center space-x-1">
                          <Linkedin className="h-3 w-3 text-gray-400" />
                          <a 
                            href={contact.linkedin_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            LinkedIn
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {generatedLeads.contacts.length > 10 && (
                  <p className="text-sm text-gray-500 text-center">
                    ... and {generatedLeads.contacts.length - 10} more contacts
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Free Lead Generation Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">1. Web Scraping</h3>
              <p className="text-sm text-gray-600">
                Searches public business directories, company websites, and social media
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">2. Email Generation</h3>
              <p className="text-sm text-gray-600">
                Generates and verifies email patterns using common business formats
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">3. Contact Discovery</h3>
              <p className="text-sm text-gray-600">
                Finds decision makers and enriches profiles with LinkedIn and job titles
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadGeneration;

