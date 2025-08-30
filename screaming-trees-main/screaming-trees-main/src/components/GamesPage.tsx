import React, { useState } from 'react';
import { Gamepad2, Play, Trophy, Users, Star, Clock, Download, Heart } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const GamesPage = () => {
  const { currentContent } = useContent();
  const [selectedGenre, setSelectedGenre] = useState('all');

  const games = [
    {
      id: 1,
      title: 'Cosmic Explorer',
      genre: 'adventure',
      description: 'Embark on an epic space adventure exploring distant galaxies and alien civilizations.',
      thumbnail: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      players: 15847,
      playtime: '2-4 hours',
      difficulty: 'medium',
      tags: ['space', 'exploration', 'sci-fi'],
      developer: 'Stellar Games',
      releaseDate: '2024',
      status: 'featured'
    },
    {
      id: 2,
      title: 'Mind Maze Runner',
      genre: 'puzzle',
      description: 'Navigate through complex mazes while solving brain-teasing puzzles and riddles.',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      players: 8934,
      playtime: '1-2 hours',
      difficulty: 'hard',
      tags: ['maze', 'puzzle', 'brain-teaser'],
      developer: 'Puzzle Masters',
      releaseDate: '2024',
      status: 'new'
    },
    {
      id: 3,
      title: 'Strategy Empire',
      genre: 'strategy',
      description: 'Build and manage your empire through strategic planning and tactical warfare.',
      thumbnail: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      players: 23156,
      playtime: '3-6 hours',
      difficulty: 'hard',
      tags: ['strategy', 'empire', 'warfare'],
      developer: 'Empire Studios',
      releaseDate: '2023',
      status: 'popular'
    },
    {
      id: 4,
      title: 'Speed Racer Pro',
      genre: 'racing',
      description: 'High-speed racing action with customizable vehicles and dynamic tracks.',
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.4,
      players: 19876,
      playtime: '30-60 min',
      difficulty: 'easy',
      tags: ['racing', 'speed', 'cars'],
      developer: 'Velocity Games',
      releaseDate: '2024',
      status: 'trending'
    },
    {
      id: 5,
      title: 'Word Wizard Academy',
      genre: 'educational',
      description: 'Enhance your vocabulary and language skills through magical word adventures.',
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      players: 12456,
      playtime: '45-90 min',
      difficulty: 'medium',
      tags: ['words', 'education', 'vocabulary'],
      developer: 'EduPlay Studios',
      releaseDate: '2024',
      status: 'educational'
    },
    {
      id: 6,
      title: 'Retro Arcade Collection',
      genre: 'arcade',
      description: 'Classic arcade games reimagined with modern graphics and enhanced gameplay.',
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      players: 7834,
      playtime: '15-30 min',
      difficulty: 'easy',
      tags: ['retro', 'arcade', 'classic'],
      developer: 'Retro Revival',
      releaseDate: '2023',
      status: 'classic'
    }
  ];

  const genres = [
    { id: 'all', label: 'All Games', count: games.length },
    { id: 'adventure', label: 'Adventure', count: games.filter(g => g.genre === 'adventure').length },
    { id: 'puzzle', label: 'Puzzle', count: games.filter(g => g.genre === 'puzzle').length },
    { id: 'strategy', label: 'Strategy', count: games.filter(g => g.genre === 'strategy').length },
    { id: 'racing', label: 'Racing', count: games.filter(g => g.genre === 'racing').length },
    { id: 'educational', label: 'Educational', count: games.filter(g => g.genre === 'educational').length },
    { id: 'arcade', label: 'Arcade', count: games.filter(g => g.genre === 'arcade').length }
  ];

  const filteredGames = games.filter(game => 
    selectedGenre === 'all' || game.genre === selectedGenre
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'featured': return 'bg-purple-600 text-white';
      case 'new': return 'bg-green-600 text-white';
      case 'popular': return 'bg-blue-600 text-white';
      case 'trending': return 'bg-red-600 text-white';
      case 'educational': return 'bg-indigo-600 text-white';
      case 'classic': return 'bg-amber-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentContent !== 'games') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <Gamepad2 className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Games</h1>
            <p className="text-gray-600">Engaging experiences across multiple genres</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Trophy className="text-indigo-600" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">Achievement Progress</p>
                <p className="text-xs text-gray-600">47 of 120 unlocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Game Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  Featured Game
                </span>
                <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  New Release
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3">Cosmic Explorer</h2>
              <p className="text-lg opacity-90 mb-4">
                Embark on the ultimate space adventure with stunning visuals and immersive gameplay.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={16} fill="currentColor" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>15K+ players</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>2-4 hours</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-3">
                <Play size={20} />
                Play Now
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-3">
                <Heart size={20} />
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedGenre === genre.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-700'
            }`}
          >
            {genre.label} ({genre.count})
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div key={game.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(game.status)}`}>
                  {game.status}
                </span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Star className="text-yellow-500" size={12} fill="currentColor" />
                  {game.rating}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <button className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Play size={18} />
                  Play Game
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                {game.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{game.playtime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{game.players.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {game.developer}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{game.genre}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {game.tags.map((tag, index) => (
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

export default GamesPage;