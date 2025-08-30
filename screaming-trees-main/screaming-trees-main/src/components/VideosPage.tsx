import React, { useState } from 'react';
import { Video, Play, Download, Share2, Clock, Eye, Heart, Search, Filter } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const VideosPage = () => {
  const { currentContent } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'Product Demo Animation',
      category: 'animation',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '2:34',
      views: 12847,
      likes: 456,
      creator: 'Motion Studios',
      uploadDate: '3 days ago',
      quality: '4K',
      tags: ['product', 'demo', 'animation']
    },
    {
      id: 2,
      title: 'Corporate Training Video',
      category: 'training',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '15:42',
      views: 8934,
      likes: 234,
      creator: 'EduTech Pro',
      uploadDate: '1 week ago',
      quality: 'HD',
      tags: ['training', 'corporate', 'education']
    },
    {
      id: 3,
      title: 'Brand Story Documentary',
      category: 'documentary',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '8:17',
      views: 15623,
      likes: 789,
      creator: 'Narrative Films',
      uploadDate: '5 days ago',
      quality: '4K',
      tags: ['brand', 'story', 'documentary']
    },
    {
      id: 4,
      title: 'UI/UX Design Process',
      category: 'tutorial',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '12:56',
      views: 6745,
      likes: 312,
      creator: 'Design Academy',
      uploadDate: '2 weeks ago',
      quality: 'HD',
      tags: ['design', 'tutorial', 'ui/ux']
    },
    {
      id: 5,
      title: 'Marketing Campaign Showcase',
      category: 'marketing',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '4:23',
      views: 9876,
      likes: 445,
      creator: 'Creative Agency',
      uploadDate: '1 day ago',
      quality: '4K',
      tags: ['marketing', 'campaign', 'showcase']
    },
    {
      id: 6,
      title: 'Time-lapse Creation',
      category: 'timelapse',
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '1:45',
      views: 4532,
      likes: 189,
      creator: 'Time Studios',
      uploadDate: '4 days ago',
      quality: '8K',
      tags: ['timelapse', 'creation', 'artistic']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Videos', count: videos.length },
    { id: 'animation', label: 'Animation', count: videos.filter(v => v.category === 'animation').length },
    { id: 'training', label: 'Training', count: videos.filter(v => v.category === 'training').length },
    { id: 'documentary', label: 'Documentary', count: videos.filter(v => v.category === 'documentary').length },
    { id: 'tutorial', label: 'Tutorial', count: videos.filter(v => v.category === 'tutorial').length },
    { id: 'marketing', label: 'Marketing', count: videos.filter(v => v.category === 'marketing').length },
    { id: 'timelapse', label: 'Time-lapse', count: videos.filter(v => v.category === 'timelapse').length }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (currentContent !== 'videos') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
            <Video className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Library</h1>
            <p className="text-gray-600">Animations, clips, tutorials, and more</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                  <Play size={24} fill="currentColor" />
                </button>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                  {video.duration}
                </span>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  video.quality === '8K' ? 'bg-purple-600 text-white' :
                  video.quality === '4K' ? 'bg-blue-600 text-white' :
                  'bg-green-600 text-white'
                }`}>
                  {video.quality}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                {video.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {video.creator}</span>
                <span>{video.uploadDate}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {video.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={14} />
                    {video.likes}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {video.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Download size={16} />
                  Download
                </button>
                <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default VideosPage;