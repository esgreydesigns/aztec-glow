import React, { useState } from 'react';
import { FileText, Download, Eye, Star, Clock, Users, Search, Filter } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const TemplatesPage = () => {
  const { currentContent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      title: 'Modern Business Proposal',
      category: 'business',
      description: 'Professional proposal template with executive summary, project scope, and pricing sections.',
      downloads: 2847,
      rating: 4.9,
      preview: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['proposal', 'business', 'professional'],
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Creative Portfolio Layout',
      category: 'design',
      description: 'Stunning portfolio template for designers and creatives with image galleries and project showcases.',
      downloads: 1923,
      rating: 4.8,
      preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['portfolio', 'creative', 'design'],
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Invoice & Billing Template',
      category: 'finance',
      description: 'Complete invoicing solution with automated calculations and professional formatting.',
      downloads: 3421,
      rating: 4.7,
      preview: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['invoice', 'billing', 'finance'],
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'Event Planning Checklist',
      category: 'planning',
      description: 'Comprehensive event planning template with timeline, vendor management, and budget tracking.',
      downloads: 1567,
      rating: 4.6,
      preview: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['events', 'planning', 'checklist'],
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      title: 'Marketing Campaign Brief',
      category: 'marketing',
      description: 'Strategic marketing template with campaign objectives, target audience analysis, and KPIs.',
      downloads: 2156,
      rating: 4.8,
      preview: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['marketing', 'campaign', 'strategy'],
      lastUpdated: '1 day ago'
    },
    {
      id: 6,
      title: 'Project Timeline Template',
      category: 'project',
      description: 'Visual project management template with Gantt charts, milestones, and resource allocation.',
      downloads: 2834,
      rating: 4.9,
      preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['project', 'timeline', 'management'],
      lastUpdated: '4 days ago'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates.length },
    { id: 'business', label: 'Business', count: templates.filter(t => t.category === 'business').length },
    { id: 'design', label: 'Design', count: templates.filter(t => t.category === 'design').length },
    { id: 'finance', label: 'Finance', count: templates.filter(t => t.category === 'finance').length },
    { id: 'planning', label: 'Planning', count: templates.filter(t => t.category === 'planning').length },
    { id: 'marketing', label: 'Marketing', count: templates.filter(t => t.category === 'marketing').length },
    { id: 'project', label: 'Project', count: templates.filter(t => t.category === 'project').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (currentContent !== 'templates') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
            <FileText className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Templates</h1>
            <p className="text-gray-600">Professional templates for documents, forms, and layouts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            <Filter size={20} />
            Filter
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-violet-50 hover:text-violet-700'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <img
                src={template.preview}
                alt={template.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Star className="text-yellow-500" size={12} fill="currentColor" />
                  {template.rating}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} />
                    Preview
                  </button>
                  <button className="flex-1 bg-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                  {template.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  template.category === 'business' ? 'bg-blue-100 text-blue-700' :
                  template.category === 'design' ? 'bg-purple-100 text-purple-700' :
                  template.category === 'finance' ? 'bg-green-100 text-green-700' :
                  template.category === 'planning' ? 'bg-orange-100 text-orange-700' :
                  template.category === 'marketing' ? 'bg-pink-100 text-pink-700' :
                  'bg-indigo-100 text-indigo-700'
                }`}>
                  {template.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    {template.downloads.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {template.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;