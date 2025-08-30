import React, { useState } from 'react';
import { HelpCircle as CircleHelp, Play, Trophy, Clock, Users, Star, Brain, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const QuizzesPage = () => {
  const { currentContent } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const quizzes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      category: 'programming',
      description: 'Test your knowledge of JavaScript basics, ES6 features, and modern development practices.',
      questions: 25,
      duration: '30 min',
      difficulty: 'intermediate',
      participants: 12847,
      averageScore: 78,
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['javascript', 'programming', 'web'],
      creator: 'CodeMaster Pro'
    },
    {
      id: 2,
      title: 'World Geography Challenge',
      category: 'geography',
      description: 'Explore countries, capitals, landmarks, and geographical features from around the world.',
      questions: 40,
      duration: '45 min',
      difficulty: 'hard',
      participants: 8934,
      averageScore: 65,
      thumbnail: 'https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['geography', 'world', 'countries'],
      creator: 'GeoExplorer'
    },
    {
      id: 3,
      title: 'Science Trivia Master',
      category: 'science',
      description: 'From physics to biology, test your scientific knowledge across multiple disciplines.',
      questions: 30,
      duration: '35 min',
      difficulty: 'intermediate',
      participants: 15623,
      averageScore: 72,
      thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['science', 'physics', 'biology'],
      creator: 'ScienceHub'
    },
    {
      id: 4,
      title: 'History Timeline Quiz',
      category: 'history',
      description: 'Journey through major historical events and test your knowledge of world history.',
      questions: 35,
      duration: '40 min',
      difficulty: 'hard',
      participants: 6745,
      averageScore: 69,
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['history', 'timeline', 'events'],
      creator: 'HistoryBuff'
    },
    {
      id: 5,
      title: 'Pop Culture Quiz',
      category: 'entertainment',
      description: 'Test your knowledge of movies, music, celebrities, and trending topics.',
      questions: 20,
      duration: '25 min',
      difficulty: 'easy',
      participants: 9876,
      averageScore: 81,
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['pop culture', 'movies', 'music'],
      creator: 'TrendMaster'
    },
    {
      id: 6,
      title: 'Business Strategy Assessment',
      category: 'business',
      description: 'Evaluate your understanding of business concepts, strategy, and management principles.',
      questions: 28,
      duration: '35 min',
      difficulty: 'intermediate',
      participants: 4532,
      averageScore: 74,
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['business', 'strategy', 'management'],
      creator: 'BizAcademy'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: quizzes.length },
    { id: 'programming', label: 'Programming', count: quizzes.filter(q => q.category === 'programming').length },
    { id: 'geography', label: 'Geography', count: quizzes.filter(q => q.category === 'geography').length },
    { id: 'science', label: 'Science', count: quizzes.filter(q => q.category === 'science').length },
    { id: 'history', label: 'History', count: quizzes.filter(q => q.category === 'history').length },
    { id: 'entertainment', label: 'Entertainment', count: quizzes.filter(q => q.category === 'entertainment').length },
    { id: 'business', label: 'Business', count: quizzes.filter(q => q.category === 'business').length }
  ];

  const filteredQuizzes = quizzes.filter(quiz => 
    selectedCategory === 'all' || quiz.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentContent !== 'quizzes') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <CircleHelp className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Quizzes</h1>
            <p className="text-gray-600">Test your knowledge with interactive assessments</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Award className="text-amber-600" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">Your Best Score</p>
                <p className="text-xs text-gray-600">92% in Science Quiz</p>
              </div>
            </div>
          </div>
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
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={quiz.thumbnail}
                alt={quiz.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Star className="text-yellow-500" size={12} fill="currentColor" />
                  {(quiz.averageScore / 20).toFixed(1)}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <button className="w-full bg-amber-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                  <Play size={18} />
                  Start Quiz
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                {quiz.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <CircleHelp size={14} />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{quiz.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{quiz.participants.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={14} />
                  <span>{quiz.averageScore}% avg</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {quiz.creator}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{quiz.category}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {quiz.tags.map((tag, index) => (
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

export default QuizzesPage;