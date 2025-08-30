import React, { createContext, useContext, useState } from 'react';

type ContentType = 'templates' | 'documents' | 'images' | 'videos' | 'puzzles' | 'quizzes' | 'games' | 'code' | 'audio' | 'ebooks' | 'designs' | 'courses' | 'automation';

interface ContentContextType {
  currentContent: ContentType;
  setCurrentContent: (content: ContentType) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentContent, setCurrentContent] = useState<ContentType>('images');

  return (
    <ContentContext.Provider value={{ currentContent, setCurrentContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};