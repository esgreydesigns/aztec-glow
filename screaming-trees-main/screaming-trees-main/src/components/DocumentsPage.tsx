import React, { useState } from 'react';
import { File, Download, Share2, Edit, Trash2, Plus, Calendar, FileType, Search } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const DocumentsPage = () => {
  const { currentContent } = useContent();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 1,
      title: 'Q4 Financial Report',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2 hours ago',
      author: 'Sarah Johnson',
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['finance', 'quarterly', 'report']
    },
    {
      id: 2,
      title: 'Employee Handbook 2024',
      type: 'DOCX',
      size: '1.8 MB',
      lastModified: '1 day ago',
      author: 'Mike Chen',
      status: 'draft',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['hr', 'handbook', 'policies']
    },
    {
      id: 3,
      title: 'Product Launch Strategy',
      type: 'PPTX',
      size: '5.2 MB',
      lastModified: '3 days ago',
      author: 'Emily Davis',
      status: 'review',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['strategy', 'launch', 'product']
    },
    {
      id: 4,
      title: 'Legal Contract Template',
      type: 'PDF',
      size: '892 KB',
      lastModified: '1 week ago',
      author: 'David Wilson',
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['legal', 'contract', 'template']
    },
    {
      id: 5,
      title: 'Training Manual v3.2',
      type: 'PDF',
      size: '3.7 MB',
      lastModified: '2 weeks ago',
      author: 'Lisa Anderson',
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['training', 'manual', 'education']
    },
    {
      id: 6,
      title: 'Brand Guidelines 2024',
      type: 'PDF',
      size: '4.1 MB',
      lastModified: '3 weeks ago',
      author: 'Alex Thompson',
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['brand', 'guidelines', 'design']
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-100 text-emerald-700';
      case 'draft': return 'bg-orange-100 text-orange-700';
      case 'review': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'DOCX': return 'bg-blue-100 text-blue-700';
      case 'PPTX': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentContent !== 'documents') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <File className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Documents</h1>
            <p className="text-gray-600">Manage your PDFs, reports, and contracts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            New Document
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            List View
          </button>
        </div>
        <p className="text-sm text-gray-600">{filteredDocuments.length} documents</p>
      </div>

      {/* Documents Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <img
                  src={doc.thumbnail}
                  alt={doc.title}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {doc.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{doc.lastModified}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    by {doc.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Share2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {doc.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-4">Document</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    <img
                      src={doc.thumbnail}
                      alt={doc.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.title}</h3>
                      <p className="text-sm text-gray-600">by {doc.author}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">{doc.size}</div>
                  <div className="col-span-2 text-sm text-gray-600">{doc.lastModified}</div>
                  <div className="col-span-1">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center gap-1">
                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-emerald-600 rounded transition-colors">
                      <Share2 size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;