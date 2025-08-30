import React, { useState } from 'react';
import { Zap, Play, Settings, Users, Clock, Activity, TrendingUp, Bot } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const AutomationPage = () => {
  const { currentContent } = useContent();
  const [selectedType, setSelectedType] = useState('all');

  const automations = [
    {
      id: 1,
      title: 'Email Marketing Automation',
      type: 'marketing',
      description: 'Automated email sequences for lead nurturing and customer engagement.',
      status: 'active',
      triggers: 5,
      actions: 12,
      runs: 2847,
      successRate: 94,
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['email', 'marketing', 'leads'],
      lastRun: '2 hours ago',
      creator: 'Marketing Team'
    },
    {
      id: 2,
      title: 'Social Media Scheduler',
      type: 'social',
      description: 'Automatically schedule and post content across multiple social media platforms.',
      status: 'active',
      triggers: 3,
      actions: 8,
      runs: 1923,
      successRate: 98,
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['social media', 'scheduling', 'content'],
      lastRun: '1 hour ago',
      creator: 'Content Team'
    },
    {
      id: 3,
      title: 'Customer Support Bot',
      type: 'support',
      description: 'AI-powered chatbot for handling common customer inquiries and support tickets.',
      status: 'active',
      triggers: 8,
      actions: 15,
      runs: 5421,
      successRate: 87,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['chatbot', 'support', 'ai'],
      lastRun: '15 minutes ago',
      creator: 'Support Team'
    },
    {
      id: 4,
      title: 'Data Backup Workflow',
      type: 'system',
      description: 'Automated daily backups of critical data with cloud storage integration.',
      status: 'active',
      triggers: 2,
      actions: 6,
      runs: 1567,
      successRate: 99,
      thumbnail: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['backup', 'data', 'cloud'],
      lastRun: '6 hours ago',
      creator: 'IT Team'
    },
    {
      id: 5,
      title: 'Lead Qualification System',
      type: 'sales',
      description: 'Automatically score and qualify leads based on behavior and demographics.',
      status: 'paused',
      triggers: 6,
      actions: 10,
      runs: 3156,
      successRate: 91,
      thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['leads', 'qualification', 'sales'],
      lastRun: '2 days ago',
      creator: 'Sales Team'
    },
    {
      id: 6,
      title: 'Content Moderation Bot',
      type: 'moderation',
      description: 'Automated content filtering and moderation for user-generated content.',
      status: 'active',
      triggers: 4,
      actions: 7,
      runs: 8934,
      successRate: 96,
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['moderation', 'content', 'filtering'],
      lastRun: '30 minutes ago',
      creator: 'Community Team'
    }
  ];

  const types = [
    { id: 'all', label: 'All Types', count: automations.length },
    { id: 'marketing', label: 'Marketing', count: automations.filter(a => a.type === 'marketing').length },
    { id: 'social', label: 'Social Media', count: automations.filter(a => a.type === 'social').length },
    { id: 'support', label: 'Support', count: automations.filter(a => a.type === 'support').length },
    { id: 'system', label: 'System', count: automations.filter(a => a.type === 'system').length },
    { id: 'sales', label: 'Sales', count: automations.filter(a => a.type === 'sales').length },
    { id: 'moderation', label: 'Moderation', count: automations.filter(a => a.type === 'moderation').length }
  ];

  const filteredAutomations = automations.filter(automation => 
    selectedType === 'all' || automation.type === selectedType
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (currentContent !== 'automation') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
            <Zap className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Automation Hub</h1>
            <p className="text-gray-600">Workflows, bots, and automated processes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Bot className="text-yellow-600" size={24} />
              <div>
                <p className="text-sm font-medium text-gray-900">Active Automations</p>
                <p className="text-xs text-gray-600">5 running, 1 paused</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <Activity className="text-green-600" size={24} />
            <span className="text-green-600 text-sm font-medium">+15%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">23,847</p>
          <p className="text-sm text-gray-600">Total Executions</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-blue-600" size={24} />
            <span className="text-blue-600 text-sm font-medium">94%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">Success Rate</p>
          <p className="text-sm text-gray-600">Average across all workflows</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <Clock className="text-purple-600" size={24} />
            <span className="text-purple-600 text-sm font-medium">-23%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">2.3h</p>
          <p className="text-sm text-gray-600">Time Saved Daily</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <Zap className="text-orange-600" size={24} />
            <span className="text-orange-600 text-sm font-medium">6</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">Active Bots</p>
          <p className="text-sm text-gray-600">Currently running</p>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-3">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedType === type.id
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-yellow-50 hover:text-yellow-700'
            }`}
          >
            {type.label} ({type.count})
          </button>
        ))}
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAutomations.map((automation) => (
          <div key={automation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative">
              <img
                src={automation.thumbnail}
                alt={automation.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(automation.status)}`}>
                  {automation.status}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {automation.successRate}% success
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Settings size={16} />
                    Configure
                  </button>
                  <button className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    automation.status === 'active' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}>
                    <Play size={16} />
                    {automation.status === 'active' ? 'Pause' : 'Start'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                {automation.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">{automation.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Zap size={14} />
                  <span>{automation.triggers} triggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings size={14} />
                  <span>{automation.actions} actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} />
                  <span>{automation.runs.toLocaleString()} runs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{automation.lastRun}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-gray-900">{automation.successRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${automation.successRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {automation.creator}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{automation.type}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {automation.tags.map((tag, index) => (
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

export default AutomationPage;