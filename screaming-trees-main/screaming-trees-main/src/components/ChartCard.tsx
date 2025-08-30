import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ChartCardProps {
  title: string;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, className = '' }) => {
  // Sample data for demonstration
  const data = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: Math.floor(Math.random() * 100) + 20
  }));

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal size={20} className="text-gray-400" />
        </button>
      </div>

      {title === 'Revenue Trends' ? (
        <div className="relative h-64">
          <div className="flex items-end justify-between h-full space-x-1">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t transition-all duration-300 hover:from-indigo-600 hover:to-indigo-400 cursor-pointer group-hover:scale-105"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                  title={`${item.month}: ${item.value}%`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {[
            { product: 'Premium Plan', sales: 1234, color: 'bg-emerald-500' },
            { product: 'Basic Plan', sales: 987, color: 'bg-blue-500' },
            { product: 'Enterprise', sales: 543, color: 'bg-purple-500' },
            { product: 'Add-ons', sales: 321, color: 'bg-orange-500' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.product}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{item.sales}</p>
                <p className="text-xs text-gray-500">sales</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChartCard;