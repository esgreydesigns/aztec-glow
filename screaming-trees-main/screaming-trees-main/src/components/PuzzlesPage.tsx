import React, { useState } from 'react';
import { Puzzle, Play, Trophy, Clock, Users, Star, Brain, Target } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const PuzzlesPage = () => {
  const { currentContent } = useContent();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const puzzles = [
    {
      id: 1,
      title: 'Logic Grid Master',
      difficulty: 'hard',
      category: 'Logic',
      description: 'Complex grid-based logic puzzle that challenges your deductive reasoning skills.',
      players: 2847,
      rating: 4.8,
      estimatedTime: '45-60 min',
      completionRate: 23,
      thumbnail: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['logic', 'grid', 'deduction']
    },
    {
      id: 2,
      title: 'Word Pattern Challenge',
      difficulty: 'medium',
      category: 'Word',
      description: 'Find hidden patterns in word sequences and unlock the secret message.',
      players: 5623,
      rating: 4.6,
      estimatedTime: '20-30 min',
      completionRate: 67,
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['words', 'pattern', 'language']
    },
    {
      id: 3,
      title: 'Number Sequence Solver',
      difficulty: 'easy',
      category: 'Math',
      description: 'Identify mathematical patterns and complete the number sequences.',
      players: 8934,
      rating: 4.4,
      estimatedTime: '10-15 min',
      completionRate: 84,
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['math', 'sequence', 'numbers']
    },
    {
      id: 4,
      title: 'Visual Spatial Puzzle',
      difficulty: 'hard',
      category: 'Spatial',
      description: 'Rotate and manipulate 3D objects to solve complex spatial challenges.',
      players: 1876,
      rating: 4.9,
      estimatedTime: '30-45 min',
      completionRate: 31,
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['spatial', 'visual', '3d']
    },
    {
      id: 5,
      title: 'Memory Palace Builder',
      difficulty: 'medium',
      category: 'Memory',
      description: 'Build and navigate through complex memory palaces to enhance recall.',
      players: 4521,
      rating: 4.7,
      estimatedTime: '25-35 min',
      completionRate: 58,
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['memory', 'palace', 'recall']
    },
    {
      id: 6,
      title: 'Cryptogram Decoder',
      difficulty: 'medium',
      category: 'Cipher',
      description: 'Decode encrypted messages using various cipher techniques and patterns.',
      players: 3267,
      rating: 4.5,
      estimatedTime: '20-40 min',
      completionRate: 45,
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['cipher', 'decode', 'cryptography']
    }
  ];

  const difficulties = [
    { id: 'all', label: 'All Levels', count: puzzles.length },
    { id: 'easy', label: 'Easy', count: puzzles.filter(p => p.difficulty === 'easy').length },
    { id: 'medium', label: 'Medium', count: puzzles.filter(p => p.difficulty === 'medium').length },
    { id: 'hard', label: 'Hard', count: puzzles.filter(p => p.difficulty === 'hard').length }
  ];

  const filteredPuzzles = puzzles.filter(puzzle => 
    selectedDifficulty === 'all' || puzzle.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentContent !== 'puzzles') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
            <Puzzle className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brain Puzzles</h1>
            <p className="text-gray-600">Challenge your mind with logic games and brain teasers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Brain className="text-emerald-600" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">Daily Challenge</p>
                <p className="text-xs text-gray-600">Complete today's puzzle</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <Target className="text-emerald-600" size={24} />
            <span className="text-emerald-600 text-sm font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-gray-600">Puzzles Solved</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="text-blue-600" size={24} />
            <span className="text-blue-600 text-sm font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-600">Achievements</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-purple-600" size={24} />
            <span className="text-purple-600 text-sm font-medium">-5%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">23m</p>
          <p className="text-sm text-gray-600">Avg. Time</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <Star className="text-orange-600" size={24} />
            <span className="text-orange-600 text-sm font-medium">+15%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.7</p>
          <p className="text-sm text-gray-600">Avg. Rating</p>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex flex-wrap gap-3">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.id}
            onClick={() => setSelectedDifficulty(difficulty.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedDifficulty === difficulty.id
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-700'
            }`}
          >
            {difficulty.label} ({difficulty.count})
          </button>
        ))}
      </div>

      {/* Puzzles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPuzzles.map((puzzle) => (
          <div key={puzzle.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={puzzle.thumbnail}
                alt={puzzle.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(puzzle.difficulty)}`}>
                  {puzzle.difficulty}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Star className="text-yellow-500" size={12} fill="currentColor" />
                  {puzzle.rating}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <button className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                  <Play size={18} />
                  Start Puzzle
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {puzzle.title}
                </h3>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  {puzzle.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{puzzle.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{puzzle.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{puzzle.players.toLocaleString()} players</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium text-gray-900">{puzzle.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${puzzle.completionRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {puzzle.tags.map((tag, index) => (
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

export default PuzzlesPage;