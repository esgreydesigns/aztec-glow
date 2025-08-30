import React from 'react';
import { 
  FileText, 
  File, 
  Image, 
  Video, 
  Puzzle, 
  CircleHelp, 
  Gamepad2, 
  Code, 
  Music, 
  BookOpen, 
  Palette, 
  Brain, 
  Zap 
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const ContentSidebar = () => {
  const { currentContent, setCurrentContent } = useContent();

  const contentItems = [
    { id: 'templates', label: 'Templates', description: 'Documents, forms, layouts', icon: FileText },
    { id: 'documents', label: 'Digital Documents', description: 'PDFs, reports, contracts', icon: File },
    { id: 'images', label: 'Images', description: 'Graphics, illustrations, art', icon: Image },
    { id: 'videos', label: 'Videos', description: 'Animations, clips, tutorials', icon: Video },
    { id: 'puzzles', label: 'Puzzles', description: 'Brain teasers, logic games', icon: Puzzle },
    { id: 'quizzes', label: 'Quizzes', description: 'Tests, assessments, trivia', icon: CircleHelp },
    { id: 'games', label: 'Games', description: 'Interactive experiences', icon: Gamepad2 },
    { id: 'code', label: 'Code', description: 'Scripts, tools, utilities', icon: Code },
    { id: 'audio', label: 'Audio', description: 'Music, sounds, podcasts', icon: Music },
    { id: 'ebooks', label: 'E-books', description: 'Guides, stories, manuals', icon: BookOpen },
    { id: 'designs', label: 'Designs', description: 'UI/UX, branding, layouts', icon: Palette },
    { id: 'courses', label: 'Courses', description: 'Learning materials, lessons', icon: Brain },
    { id: 'automation', label: 'Automation', description: 'Workflows, bots, scripts', icon: Zap },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-purple-800/30 flex flex-col fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="p-6 border-b border-purple-800/30">
        <h1 className="text-xl font-serif font-bold text-white">Acrylic Alchemy</h1>
        <p className="text-sm text-purple-200 mt-1">Content Creation Studio</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {contentItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentContent === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentContent(item.id as any)}
              className={`w-full p-4 text-left transition-all duration-200 rounded-lg group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25 transform scale-105'
                  : 'text-purple-100 hover:bg-purple-800/30 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  size={20} 
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-purple-300 group-hover:text-purple-100'
                  }`} 
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.label}</div>
                  <div className={`text-xs opacity-70 truncate ${
                    isActive ? 'text-purple-100' : 'text-purple-400'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-purple-800/30">
        <div className="text-xs text-purple-300 text-center">v2.0 • Personal Edition</div>
      </div>
    </div>
  );
};

export default ContentSidebar;