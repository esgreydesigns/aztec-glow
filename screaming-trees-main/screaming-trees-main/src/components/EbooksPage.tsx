import React, { useState } from 'react';
import { BookOpen, Download, Star, Eye, Clock, Users, Search, Filter } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const EbooksPage = () => {
  const { currentContent } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const ebooks = [
    {
      id: 1,
      title: 'The Complete Guide to Modern Web Development',
      author: 'Sarah Johnson',
      category: 'technology',
      description: 'Comprehensive guide covering React, Node.js, and modern development practices.',
      pages: 342,
      readTime: '8-12 hours',
      rating: 4.8,
      readers: 15847,
      downloads: 3247,
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['web development', 'react', 'javascript'],
      publishDate: '2024',
      format: 'PDF, EPUB'
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      author: 'Mike Chen',
      category: 'business',
      description: 'Master the art of digital marketing with proven strategies and real-world case studies.',
      pages: 278,
      readTime: '6-9 hours',
      rating: 4.6,
      readers: 12934,
      downloads: 2156,
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['marketing', 'digital', 'strategy'],
      publishDate: '2024',
      format: 'PDF, MOBI'
    },
    {
      id: 3,
      title: 'The Art of Creative Writing',
      author: 'Emily Davis',
      category: 'creative',
      description: 'Unlock your creative potential with techniques for storytelling and character development.',
      pages: 195,
      readTime: '4-6 hours',
      rating: 4.9,
      readers: 8756,
      downloads: 1876,
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['writing', 'creative', 'storytelling'],
      publishDate: '2023',
      format: 'PDF, EPUB'
    },
    {
      id: 4,
      title: 'Financial Freedom Blueprint',
      author: 'David Wilson',
      category: 'finance',
      description: 'Practical strategies for building wealth and achieving financial independence.',
      pages: 256,
      readTime: '5-8 hours',
      rating: 4.7,
      readers: 19876,
      downloads: 4532,
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['finance', 'investment', 'wealth'],
      publishDate: '2024',
      format: 'PDF, EPUB, MOBI'
    },
    {
      id: 5,
      title: 'Leadership in the Digital Age',
      author: 'Lisa Anderson',
      category: 'leadership',
      description: 'Navigate modern leadership challenges with insights from successful digital leaders.',
      pages: 312,
      readTime: '7-10 hours',
      rating: 4.5,
      readers: 7234,
      downloads: 1567,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['leadership', 'management', 'digital'],
      publishDate: '2023',
      format: 'PDF, EPUB'
    },
    {
      id: 6,
      title: 'Mindfulness and Productivity',
      author: 'Alex Thompson',
      category: 'wellness',
      description: 'Combine mindfulness practices with productivity techniques for better work-life balance.',
      pages: 189,
      readTime: '3-5 hours',
      rating: 4.8,
      readers: 11456,
      downloads: 2789,
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['mindfulness', 'productivity', 'wellness'],
      publishDate: '2024',
      format: 'PDF, EPUB'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: ebooks.length },
    { id: 'technology', label: 'Technology', count: ebooks.filter(e => e.category === 'technology').length },
    { id: 'business', label: 'Business', count: ebooks.filter(e => e.category === 'business').length },
    { id: 'creative', label: 'Creative', count: ebooks.filter(e => e.category === 'creative').length },
    { id: 'finance', label: 'Finance', count: ebooks.filter(e => e.category === 'finance').length },
    { id: 'leadership', label: 'Leadership', count: ebooks.filter(e => e.category === 'leadership').length },
    { id: 'wellness', label: 'Wellness', count: ebooks.filter(e => e.category === 'wellness').length }
  ];

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (currentContent !== 'ebooks') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
            <BookOpen className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Library</h1>
            <p className="text-gray-600">Guides, stories, and educational materials</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
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
                ? 'bg-teal-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-teal-50 hover:text-teal-700'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* E-books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEbooks.map((ebook) => (
          <div key={ebook.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={ebook.thumbnail}
                alt={ebook.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Star className="text-yellow-500" size={12} fill="currentColor" />
                  {ebook.rating}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} />
                    Preview
                  </button>
                  <button className="flex-1 bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                {ebook.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">by {ebook.author}</p>
              
              <p className="text-gray-600 text-sm mb-4">{ebook.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} />
                  <span>{ebook.pages} pages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{ebook.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{ebook.readers.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download size={14} />
                  <span>{ebook.downloads.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>{ebook.publishDate}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{ebook.format}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {ebook.tags.map((tag, index) => (
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

export default EbooksPage;