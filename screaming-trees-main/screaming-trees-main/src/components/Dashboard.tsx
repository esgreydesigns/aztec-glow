import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { usePage } from '../context/PageContext';
import StatsCard from './StatsCard';
import ChartCard from './ChartCard';

const Dashboard = () => {
  const { currentPage } = usePage();
  const [stats, setStats] = useState({
    revenue: 45231,
    users: 1234,
    orders: 89,
    conversion: 3.2
  });

  // Simulate real-time data updates
  useEffect(() => {
    if (currentPage !== 'dashboard') return;
    
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 100),
        users: prev.users + Math.floor(Math.random() * 5),
        orders: prev.orders + Math.floor(Math.random() * 3),
        conversion: +(prev.conversion + (Math.random() - 0.5) * 0.1).toFixed(1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);

  if (currentPage !== 'dashboard') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="emerald"
        />
        <StatsCard
          title="Active Users"
          value={stats.users.toLocaleString()}
          change="+8.2%"
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Orders"
          value={stats.orders.toString()}
          change="-2.1%"
          trend="down"
          icon={Activity}
          color="orange"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversion}%`}
          change="+0.8%"
          trend="up"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Revenue Trends"
          className="lg:col-span-2"
        />
        <ChartCard
          title="Top Products"
          className="lg:col-span-1"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'New order received', user: 'John Doe', time: '2 minutes ago', status: 'success' },
              { action: 'Payment processed', user: 'Sarah Smith', time: '5 minutes ago', status: 'success' },
              { action: 'User registered', user: 'Mike Johnson', time: '12 minutes ago', status: 'info' },
              { action: 'Support ticket created', user: 'Emily Davis', time: '18 minutes ago', status: 'warning' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;