import React, { useState } from 'react';
import { Image, Download, Heart, Share2, Eye, Grid3X3, List, Search, Filter, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const ImagesPage = () => {
  const { currentContent } = useContent();
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const images = [
    {
      id: 1,
      title: 'Abstract Geometric Art',
      category: 'abstract',
      url: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600',
      downloads: 1247,
      likes: 89,
      tags: ['abstract', 'geometric', 'colorful'],
      artist: 'Alex Rivera',
      resolution: '4K',
      aspectRatio: 'landscape'
    },
    {
      id: 2,
      title: 'Minimalist Portrait',
      category: 'portrait',
      url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloads: 892,
      likes: 156,
      tags: ['portrait', 'minimalist', 'professional'],
      artist: 'Sarah Kim',
      resolution: '6K',
      aspectRatio: 'portrait'
    },
    {
      id: 3,
      title: 'Nature Landscape',
      category: 'nature',
      url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      downloads: 2156,
      likes: 234,
      tags: ['nature', 'landscape', 'mountains'],
      artist: 'Mike Johnson',
      resolution: '8K',
      aspectRatio: 'landscape'
    },
    {
      id: 4,
      title: 'Urban Architecture',
      category: 'architecture',
      url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
      downloads: 1534,
      likes: 178,
      tags: ['architecture', 'urban', 'modern'],
      artist: 'Emma Davis',
      resolution: '4K',
      aspectRatio: 'portrait'
    },
    {
      id: 5,
      title: 'Vintage Texture',
      category: 'texture',
      url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      downloads: 967,
      likes: 123,
      tags: ['vintage', 'texture', 'grunge'],
      artist: 'David Chen',
      resolution: '2K',
      aspectRatio: 'square'
    },
    {
      id: 6,
      title: 'Digital Art Concept',
      category: 'digital',
      url: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=500',
      downloads: 1789,
      likes: 267,
      tags: ['digital', 'concept', 'futuristic'],
      artist: 'Lisa Wong',
      resolution: '4K',
      aspectRatio: 'landscape'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Images', count: images.length },
    { id: 'abstract', label: 'Abstract', count: images.filter(i => i.category === 'abstract').length },
    { id: 'portrait', label: 'Portrait', count: images.filter(i => i.category === 'portrait').length },
    { id: 'nature', label: 'Nature', count: images.filter(i => i.category === 'nature').length },
    { id: 'architecture', label: 'Architecture', count: images.filter(i => i.category === 'architecture').length },
    { id: 'texture', label: 'Texture', count: images.filter(i => i.category === 'texture').length },
    { id: 'digital', label: 'Digital Art', count: images.filter(i => i.category === 'digital').length }
  ];

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (currentContent !== 'images') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
            <Image className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Gallery</h1>
            <p className="text-gray-600">High-quality graphics, illustrations, and artwork</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all">
            <Sparkles size={20} />
            AI Generate
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
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-pink-50 hover:text-pink-700'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('masonry')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'masonry' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid3X3 size={16} />
            Masonry
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List size={16} />
            Grid
          </button>
        </div>
        <p className="text-sm text-gray-600">{filteredImages.length} images</p>
      </div>

      {/* Images Display */}
      <div className={viewMode === 'masonry' ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
        {filteredImages.map((image) => (
          <div key={image.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''}`}>
            <div className="relative overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ height: viewMode === 'grid' ? '200px' : 'auto' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-lg hover:bg-white transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="flex-1 bg-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors">
                {image.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {image.artist}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{image.resolution}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Download size={14} />
                    {image.downloads.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={14} />
                    {image.likes}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {image.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <Image className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ImagesPage;