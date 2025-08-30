import React from 'react';
import { DivideIcon as LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'orange' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, trend, icon: Icon, color }) => {
  const colorClasses = {
    emerald: 'bg-emerald-500 text-emerald-600',
    blue: 'bg-blue-500 text-blue-600',
    orange: 'bg-orange-500 text-orange-600',
    purple: 'bg-purple-500 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${colorClasses[color].split(' ')[0]} bg-opacity-10`}>
          <Icon className={colorClasses[color].split(' ')[1]} size={24} />
        </div>
        <div className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-emerald-600' : 'text-red-500'
        }`}>
          {trend === 'up' ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

export default StatsCard;