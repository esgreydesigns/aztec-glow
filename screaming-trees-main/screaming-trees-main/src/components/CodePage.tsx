import React, { useState } from 'react';
import { Code, Download, Star, Eye, GitFork, Search, Filter, Terminal } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const CodePage = () => {
  const { currentContent } = useContent();
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const codeSnippets = [
    {
      id: 1,
      title: 'React Custom Hooks Collection',
      language: 'javascript',
      description: 'A comprehensive collection of reusable React hooks for common functionality.',
      code: `// useLocalStorage hook
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};`,
      downloads: 3247,
      stars: 156,
      forks: 23,
      author: 'ReactMaster',
      lastUpdated: '2 days ago',
      tags: ['react', 'hooks', 'utility']
    },
    {
      id: 2,
      title: 'Python Data Analysis Toolkit',
      language: 'python',
      description: 'Essential Python functions for data cleaning, analysis, and visualization.',
      code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def analyze_dataset(df):
    """
    Comprehensive dataset analysis function
    """
    print("Dataset Overview:")
    print(f"Shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    
    # Missing values analysis
    missing_data = df.isnull().sum()
    if missing_data.any():
        print("\\nMissing Values:")
        print(missing_data[missing_data > 0])
    
    # Basic statistics
    print("\\nBasic Statistics:")
    return df.describe()`,
      downloads: 2156,
      stars: 89,
      forks: 34,
      author: 'DataScientist',
      lastUpdated: '1 week ago',
      tags: ['python', 'data', 'analysis']
    },
    {
      id: 3,
      title: 'CSS Animation Library',
      language: 'css',
      description: 'Beautiful CSS animations and transitions for modern web applications.',
      code: `/* Smooth fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Hover effect for cards */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}`,
      downloads: 4521,
      stars: 234,
      forks: 67,
      author: 'CSSWizard',
      lastUpdated: '3 days ago',
      tags: ['css', 'animation', 'ui']
    },
    {
      id: 4,
      title: 'Node.js API Utilities',
      language: 'javascript',
      description: 'Utility functions for building robust Node.js APIs with error handling.',
      code: `const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
};

const rateLimiter = (windowMs, max) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const requestTimes = requests.get(ip);
    const validRequests = requestTimes.filter(time => time > windowStart);
    
    if (validRequests.length >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests'
      });
    }
    
    validRequests.push(now);
    requests.set(ip, validRequests);
    next();
  };
};`,
      downloads: 1876,
      stars: 78,
      forks: 19,
      author: 'NodeDev',
      lastUpdated: '5 days ago',
      tags: ['nodejs', 'api', 'backend']
    }
  ];

  const languages = [
    { id: 'all', label: 'All Languages', count: codeSnippets.length },
    { id: 'javascript', label: 'JavaScript', count: codeSnippets.filter(c => c.language === 'javascript').length },
    { id: 'python', label: 'Python', count: codeSnippets.filter(c => c.language === 'python').length },
    { id: 'css', label: 'CSS', count: codeSnippets.filter(c => c.language === 'css').length }
  ];

  const filteredCode = codeSnippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  if (currentContent !== 'code') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-slate-700 to-gray-800 shadow-lg">
            <Code className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Repository</h1>
            <p className="text-gray-600">Scripts, tools, and utilities for developers</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors">
            <Terminal size={20} />
            New Snippet
          </button>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap gap-3">
        {languages.map((language) => (
          <button
            key={language.id}
            onClick={() => setSelectedLanguage(language.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedLanguage === language.id
                ? 'bg-slate-700 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {language.label} ({language.count})
          </button>
        ))}
      </div>

      {/* Code Snippets */}
      <div className="space-y-6">
        {filteredCode.map((snippet) => (
          <div key={snippet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{snippet.title}</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      snippet.language === 'javascript' ? 'bg-yellow-100 text-yellow-700' :
                      snippet.language === 'python' ? 'bg-blue-100 text-blue-700' :
                      snippet.language === 'css' ? 'bg-pink-100 text-pink-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {snippet.language}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{snippet.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      {snippet.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      {snippet.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={14} />
                      {snippet.forks}
                    </div>
                    <span>by {snippet.author}</span>
                    <span>{snippet.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Eye size={20} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                  <code>{snippet.code}</code>
                </pre>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {snippet.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    Copy Code
                  </button>
                  <button className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Fork
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodePage;