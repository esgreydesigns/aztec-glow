import React, { useState, useEffect } from 'react';
import { BarChart, PieChart, LineChart, Target, Eye, Clock } from 'lucide-react';
import { usePage } from '../context/PageContext';

const Analytics = () => {
  const { currentPage } = usePage();
  const [selectedMetric, setSelectedMetric] = useState('views');
  const [timeRange, setTimeRange] = useState('7d');

  const metrics = [
    { id: 'views', label: 'Page Views', icon: Eye, value: '12.5K', change: '+15.3%' },
    { id: 'sessions', label: 'Sessions', icon: Target, value: '3.2K', change: '+8.7%' },
    { id: 'duration', label: 'Avg. Duration', icon: Clock, value: '4:32', change: '+12.1%' },
  ];

  const chartData = [
    { day: 'Mon', value: 400 },
    { day: 'Tue', value: 600 },
    { day: 'Wed', value: 800 },
    { day: 'Thu', value: 700 },
    { day: 'Fri', value: 900 },
    { day: 'Sat', value: 1200 },
    { day: 'Sun', value: 1100 },
  ];

  if (currentPage !== 'analytics') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Deep insights into your application performance and user behavior.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                timeRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-102'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`${isSelected ? 'text-indigo-600' : 'text-gray-400'} transition-colors`} size={24} />
                <span className="text-sm font-medium text-emerald-600">{metric.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </button>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
          <div className="flex items-center space-x-2">
            <BarChart className="text-indigo-500" size={20} />
            <span className="text-sm text-gray-600">Interactive View</span>
          </div>
        </div>
        
        <div className="relative h-64">
          <div className="flex items-end justify-between h-full space-x-2">
            {chartData.map((item, index) => (
              <div key={item.day} className="flex flex-col items-center flex-1 group">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-lg transition-all duration-300 hover:from-indigo-600 hover:to-indigo-400 cursor-pointer group-hover:scale-105"
                  style={{ height: `${(item.value / 1200) * 100}%` }}
                  title={`${item.day}: ${item.value}`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {[
              { source: 'Direct', percentage: 45, color: 'bg-indigo-500' },
              { source: 'Social Media', percentage: 30, color: 'bg-emerald-500' },
              { source: 'Search Engines', percentage: 20, color: 'bg-orange-500' },
              { source: 'Email', percentage: 5, color: 'bg-purple-500' },
            ].map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${source.color} transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="space-y-4">
            {[
              { country: 'United States', users: '2,847', flag: '🇺🇸' },
              { country: 'United Kingdom', users: '1,423', flag: '🇬🇧' },
              { country: 'Germany', users: '987', flag: '🇩🇪' },
              { country: 'France', users: '654', flag: '🇫🇷' },
              { country: 'Canada', users: '432', flag: '🇨🇦' },
            ].map((country, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{country.country}</span>
                </div>
                <span className="text-sm text-gray-600">{country.users}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;