import React, { useState } from 'react';
import { Brain, Play, Clock, Users, Star, BookOpen, Award, Search } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const CoursesPage = () => {
  const { currentContent } = useContent();
  const [selectedLevel, setSelectedLevel] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      level: 'advanced',
      description: 'Master advanced React patterns, performance optimization, and modern development practices.',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '12 hours',
      lessons: 45,
      students: 8934,
      rating: 4.9,
      price: '$89',
      category: 'Programming',
      tags: ['react', 'javascript', 'frontend'],
      progress: 0,
      certificate: true
    },
    {
      id: 2,
      title: 'Digital Marketing Fundamentals',
      instructor: 'Mike Chen',
      level: 'beginner',
      description: 'Learn the basics of digital marketing including SEO, social media, and content strategy.',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '8 hours',
      lessons: 32,
      students: 15623,
      rating: 4.7,
      price: '$59',
      category: 'Marketing',
      tags: ['marketing', 'seo', 'social media'],
      progress: 0,
      certificate: true
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emily Davis',
      level: 'intermediate',
      description: 'Complete guide to user interface and user experience design principles and tools.',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '15 hours',
      lessons: 52,
      students: 12456,
      rating: 4.8,
      price: '$99',
      category: 'Design',
      tags: ['ui', 'ux', 'design'],
      progress: 0,
      certificate: true
    },
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'David Wilson',
      level: 'intermediate',
      description: 'Comprehensive data science course covering pandas, numpy, and machine learning basics.',
      thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '20 hours',
      lessons: 68,
      students: 9876,
      rating: 4.6,
      price: '$129',
      category: 'Data Science',
      tags: ['python', 'data science', 'ml'],
      progress: 0,
      certificate: true
    },
    {
      id: 5,
      title: 'Business Strategy Essentials',
      instructor: 'Lisa Anderson',
      level: 'beginner',
      description: 'Learn fundamental business strategy concepts and frameworks for success.',
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '6 hours',
      lessons: 24,
      students: 7234,
      rating: 4.5,
      price: '$49',
      category: 'Business',
      tags: ['strategy', 'business', 'management'],
      progress: 0,
      certificate: false
    },
    {
      id: 6,
      title: 'Creative Writing Workshop',
      instructor: 'Alex Thompson',
      level: 'beginner',
      description: 'Develop your creative writing skills with practical exercises and expert feedback.',
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      duration: '10 hours',
      lessons: 36,
      students: 5432,
      rating: 4.8,
      price: '$69',
      category: 'Creative',
      tags: ['writing', 'creative', 'storytelling'],
      progress: 0,
      certificate: true
    }
  ];

  const levels = [
    { id: 'all', label: 'All Levels', count: courses.length },
    { id: 'beginner', label: 'Beginner', count: courses.filter(c => c.level === 'beginner').length },
    { id: 'intermediate', label: 'Intermediate', count: courses.filter(c => c.level === 'intermediate').length },
    { id: 'advanced', label: 'Advanced', count: courses.filter(c => c.level === 'advanced').length }
  ];

  const filteredCourses = courses.filter(course => 
    selectedLevel === 'all' || course.level === selectedLevel
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentContent !== 'courses') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <Brain className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Courses</h1>
            <p className="text-gray-600">Educational materials and structured lessons</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Award className="text-blue-600" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">Certificates Earned</p>
                <p className="text-xs text-gray-600">3 of 12 completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedLevel === level.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {level.label} ({level.count})
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                {course.certificate && (
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Certificate
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                  <Star className="text-yellow-500" size={12} fill="currentColor" />
                  {course.rating}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Play size={18} />
                  Start Learning
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {course.title}
                </h3>
                <span className="text-lg font-bold text-blue-600">{course.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-1">by {course.instructor}</p>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} />
                  <span>{course.category}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {course.tags.map((tag, index) => (
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

export default CoursesPage;