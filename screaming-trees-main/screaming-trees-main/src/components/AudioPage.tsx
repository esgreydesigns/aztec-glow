import React, { useState } from 'react';
import { Music, Play, Pause, Download, Heart, Share2, Volume2, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AudioPage = () => {
  const { currentContent } = useContent();
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [playingId, setPlayingId] = useState<number | null>(null);

  const audioTracks = [
    {
      id: 1,
      title: 'Ambient Workspace',
      artist: 'Focus Sounds',
      genre: 'ambient',
      duration: '3:45',
      description: 'Calming ambient sounds perfect for concentration and productivity.',
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      plays: 12847,
      likes: 456,
      downloads: 234,
      tags: ['ambient', 'focus', 'productivity'],
      waveform: [20, 35, 45, 30, 55, 40, 65, 50, 75, 60, 80, 45, 30, 55, 40]
    },
    {
      id: 2,
      title: 'Corporate Presentation Theme',
      artist: 'Business Audio',
      genre: 'corporate',
      duration: '2:30',
      description: 'Professional background music ideal for presentations and corporate videos.',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      plays: 8934,
      likes: 234,
      downloads: 167,
      tags: ['corporate', 'presentation', 'professional'],
      waveform: [15, 25, 35, 45, 40, 50, 35, 60, 45, 55, 40, 30, 25, 35, 20]
    },
    {
      id: 3,
      title: 'Upbeat Marketing Jingle',
      artist: 'Creative Beats',
      genre: 'commercial',
      duration: '1:15',
      description: 'Energetic and catchy tune perfect for marketing campaigns and advertisements.',
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      plays: 15623,
      likes: 789,
      downloads: 445,
      tags: ['commercial', 'upbeat', 'marketing'],
      waveform: [40, 60, 80, 70, 90, 85, 95, 80, 75, 85, 70, 60, 50, 40, 30]
    },
    {
      id: 4,
      title: 'Podcast Intro Music',
      artist: 'Audio Craft',
      genre: 'podcast',
      duration: '0:45',
      description: 'Professional podcast intro with smooth transitions and clear audio quality.',
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      plays: 6745,
      likes: 312,
      downloads: 189,
      tags: ['podcast', 'intro', 'professional'],
      waveform: [25, 40, 55, 45, 60, 50, 65, 55, 70, 60, 50, 40, 30, 20, 15]
    },
    {
      id: 5,
      title: 'Nature Soundscape',
      artist: 'Earth Sounds',
      genre: 'nature',
      duration: '8:20',
      description: 'Relaxing nature sounds including forest ambience, water streams, and bird songs.',
      thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      plays: 9876,
      likes: 567,
      downloads: 334,
      tags: ['nature', 'relaxation', 'ambient'],
      waveform: [10, 20, 15, 25, 20, 30, 25, 35, 30, 25, 20, 15, 10, 15, 20]
    },
    {
      id: 6,
      title: 'Electronic Beat Loop',
      artist: 'Synth Masters',
      genre: 'electronic',
      duration: '4:12',
      description: 'Modern electronic beat perfect for tech videos and digital content.',
      thumbnail: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400',
      plays: 4532,
      likes: 189,
      downloads: 123,
      tags: ['electronic', 'beat', 'tech'],
      waveform: [50, 70, 85, 75, 90, 80, 95, 85, 80, 75, 70, 60, 50, 45, 40]
    }
  ];

  const genres = [
    { id: 'all', label: 'All Genres', count: audioTracks.length },
    { id: 'ambient', label: 'Ambient', count: audioTracks.filter(a => a.genre === 'ambient').length },
    { id: 'corporate', label: 'Corporate', count: audioTracks.filter(a => a.genre === 'corporate').length },
    { id: 'commercial', label: 'Commercial', count: audioTracks.filter(a => a.genre === 'commercial').length },
    { id: 'podcast', label: 'Podcast', count: audioTracks.filter(a => a.genre === 'podcast').length },
    { id: 'nature', label: 'Nature', count: audioTracks.filter(a => a.genre === 'nature').length },
    { id: 'electronic', label: 'Electronic', count: audioTracks.filter(a => a.genre === 'electronic').length }
  ];

  const filteredAudio = audioTracks.filter(track => 
    selectedGenre === 'all' || track.genre === selectedGenre
  );

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  if (currentContent !== 'audio') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
            <Music className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Audio Library</h1>
            <p className="text-gray-600">Music, sounds, and podcasts for your projects</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Volume2 className="text-purple-600" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">Now Playing</p>
                <p className="text-xs text-gray-600">
                  {playingId ? audioTracks.find(t => t.id === playingId)?.title : 'No track selected'}
                </p>
              </div>
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
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-purple-50 hover:text-purple-700'
            }`}
          >
            {genre.label} ({genre.count})
          </button>
        ))}
      </div>

      {/* Audio Tracks */}
      <div className="space-y-4">
        {filteredAudio.map((track) => (
          <div key={track.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={track.thumbnail}
                  alt={track.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <button
                  onClick={() => togglePlay(track.id)}
                  className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  {playingId === track.id ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{track.title}</h3>
                    <p className="text-gray-600">by {track.artist}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      track.genre === 'ambient' ? 'bg-green-100 text-green-700' :
                      track.genre === 'corporate' ? 'bg-blue-100 text-blue-700' :
                      track.genre === 'commercial' ? 'bg-orange-100 text-orange-700' :
                      track.genre === 'podcast' ? 'bg-purple-100 text-purple-700' :
                      track.genre === 'nature' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-pink-100 text-pink-700'
                    }`}>
                      {track.genre}
                    </span>
                    <span className="text-sm text-gray-500">{track.duration}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{track.description}</p>
                
                {/* Waveform Visualization */}
                <div className="flex items-center gap-1 mb-4 h-8">
                  {track.waveform.map((height, index) => (
                    <div
                      key={index}
                      className={`w-2 rounded-full transition-all duration-300 ${
                        playingId === track.id ? 'bg-purple-500' : 'bg-gray-300'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Play size={14} />
                      {track.plays.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={14} />
                      {track.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      {track.downloads}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Heart size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {track.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPage;