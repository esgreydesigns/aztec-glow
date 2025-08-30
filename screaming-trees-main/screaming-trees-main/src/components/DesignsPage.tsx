import React, { useState } from 'react';
import { Palette, Download, Heart, Eye, Share2, Layers, Grid3X3, Search } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const DesignsPage = () => {
  const { currentContent } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const designs = [
    {
      id: 1,
      title: 'Modern Dashboard UI Kit',
      category: 'ui-kit',
      description: 'Complete dashboard interface with 50+ components and dark/light themes.',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      designer: 'UI Masters',
      downloads: 4521,
      likes: 789,
      views: 12847,
      components: 52,
      formats: ['Figma', 'Sketch', 'Adobe XD'],
      tags: ['dashboard', 'ui kit', 'components'],
      price: 'Free',
      featured: true
    },
    {
      id: 2,
      title: 'Brand Identity Package',
      category: 'branding',
      description: 'Complete brand identity system including logos, color palettes, and typography.',
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600',
      designer: 'Brand Studio',
      downloads: 2156,
      likes: 456,
      views: 8934,
      components: 25,
      formats: ['AI', 'EPS', 'PNG'],
      tags: ['branding', 'logo', 'identity'],
      price: '$29',
      featured: false
    },
    {
      id: 3,
      title: 'Mobile App Wireframes',
      category: 'wireframe',
      description: 'Professional wireframe templates for iOS and Android app development.',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      designer: 'Mobile Design Co',
      downloads: 3267,
      likes: 567,
      views: 15623,
      components: 38,
      formats: ['Figma', 'Sketch'],
      tags: ['mobile', 'wireframe', 'app'],
      price: 'Free',
      featured: true
    },
    {
      id: 4,
      title: 'E-commerce Website Template',
      category: 'template',
      description: 'Modern e-commerce design with product pages, checkout flow, and admin panel.',
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
      designer: 'Web Designers',
      downloads: 1876,
      likes: 234,
      views: 6745,
      components: 45,
      formats: ['HTML', 'CSS', 'Figma'],
      tags: ['ecommerce', 'website', 'template'],
      price: '$49',
      featured: false
    },
    {
      id: 5,
      title: 'Social Media Graphics Pack',
      category: 'graphics',
      description: 'Ready-to-use social media templates for Instagram, Facebook, and Twitter.',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      designer: 'Social Graphics',
      downloads: 5432,
      likes: 892,
      views: 23156,
      components: 75,
      formats: ['PSD', 'AI', 'PNG'],
      tags: ['social media', 'graphics', 'templates'],
      price: '$19',
      featured: true
    },
    {
      id: 6,
      title: 'Icon Set Collection',
      category: 'icons',
      description: 'Comprehensive icon library with 500+ icons in multiple styles and formats.',
      thumbnail: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600',
      designer: 'Icon Factory',
      downloads: 7834,
      likes: 1234,
      views: 34567,
      components: 500,
      formats: ['SVG', 'PNG', 'AI'],
      tags: ['icons', 'ui', 'graphics'],
      price: 'Free',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Designs', count: designs.length },
    { id: 'ui-kit', label: 'UI Kits', count: designs.filter(d => d.category === 'ui-kit').length },
    { id: 'branding', label: 'Branding', count: designs.filter(d => d.category === 'branding').length },
    { id: 'wireframe', label: 'Wireframes', count: designs.filter(d => d.category === 'wireframe').length },
    { id: 'template', label: 'Templates', count: designs.filter(d => d.category === 'template').length },
    { id: 'graphics', label: 'Graphics', count: designs.filter(d => d.category === 'graphics').length },
    { id: 'icons', label: 'Icons', count: designs.filter(d => d.category === 'icons').length }
  ];

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (currentContent !== 'designs') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
            <Palette className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Design Assets</h1>
            <p className="text-gray-600">UI/UX designs, branding, and creative layouts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
            <Layers size={20} />
            Upload Design
          </button>
        </div>
      </div>

      {/* Featured Designs Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3">Featured Design Collection</h2>
            <p className="text-lg opacity-90 mb-4">
              Discover our handpicked selection of premium design assets
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span>50+ Premium Templates</span>
              <span>•</span>
              <span>Multiple Formats</span>
              <span>•</span>
              <span>Commercial License</span>
            </div>
          </div>
          <button className="bg-white text-rose-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Explore Collection
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
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-rose-50 hover:text-rose-700'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map((design) => (
          <div key={design.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={design.thumbnail}
                alt={design.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 left-3 flex gap-2">
                {design.featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Featured
                  </span>
                )}
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  design.price === 'Free' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {design.price}
                </span>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} />
                    Preview
                  </button>
                  <button className="flex-1 bg-rose-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-700 transition-colors">
                {design.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">{design.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Layers size={14} />
                  <span>{design.components} items</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={14} />
                  <span>{design.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download size={14} />
                  <span>{design.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={14} />
                  <span>{design.likes}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {design.designer}</span>
                <div className="flex gap-1">
                  {design.formats.slice(0, 2).map((format, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                      {format}
                    </span>
                  ))}
                  {design.formats.length > 2 && (
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                      +{design.formats.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {design.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignsPage;