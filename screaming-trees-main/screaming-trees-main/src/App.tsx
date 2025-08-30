import React, { useState } from 'react';
import ContentSidebar from './components/ContentSidebar';
import TemplatesPage from './components/TemplatesPage';
import DocumentsPage from './components/DocumentsPage';
import ImagesPage from './components/ImagesPage';
import VideosPage from './components/VideosPage';
import PuzzlesPage from './components/PuzzlesPage';
import QuizzesPage from './components/QuizzesPage';
import GamesPage from './components/GamesPage';
import CodePage from './components/CodePage';
import AudioPage from './components/AudioPage';
import EbooksPage from './components/EbooksPage';
import DesignsPage from './components/DesignsPage';
import CoursesPage from './components/CoursesPage';
import AutomationPage from './components/AutomationPage';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 flex">
        <ContentSidebar />
        <main className="flex-1 ml-64 transition-all duration-300">
          <div className="p-6 space-y-6">
            <TemplatesPage />
            <DocumentsPage />
            <ImagesPage />
            <VideosPage />
            <PuzzlesPage />
            <QuizzesPage />
            <GamesPage />
            <CodePage />
            <AudioPage />
            <EbooksPage />
            <DesignsPage />
            <CoursesPage />
            <AutomationPage />
          </div>
        </main>
      </div>
    </ContentProvider>
  );
}

export default App;