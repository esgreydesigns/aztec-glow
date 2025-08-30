import React, { useState } from 'react';
import { Bell, Shield, Palette, Globe, Save, Check } from 'lucide-react';
import { usePage } from '../context/PageContext';

const Settings = () => {
  const { currentPage } = usePage();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      marketing: true
    },
    privacy: {
      analytics: true,
      cookies: true,
      dataSharing: false
    },
    appearance: {
      theme: 'light',
      language: 'en'
    }
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  if (currentPage !== 'settings') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and application settings.</p>
        </div>
        <button
          onClick={handleSave}
          className={`mt-4 sm:mt-0 flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            saved
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {saved ? <Check size={20} className="mr-2" /> : <Save size={20} className="mr-2" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="text-indigo-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {key === 'email' ? 'Email Notifications' : 
                     key === 'push' ? 'Push Notifications' : 'Marketing Communications'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === 'email' ? 'Receive important updates via email' :
                     key === 'push' ? 'Get real-time push notifications' : 'Receive product updates and offers'}
                  </p>
                </div>
                <button
                  onClick={() => updateSetting('notifications', key, !value)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    value ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    value ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-emerald-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {key === 'analytics' ? 'Analytics Tracking' :
                     key === 'cookies' ? 'Cookie Preferences' : 'Data Sharing'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === 'analytics' ? 'Help us improve by sharing anonymous usage data' :
                     key === 'cookies' ? 'Allow cookies for enhanced experience' : 'Share data with trusted partners'}
                  </p>
                </div>
                <button
                  onClick={() => updateSetting('privacy', key, !value)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    value ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    value ? 'transform translate-x-6' : 'transform translate-x-0.5'
                  }`}></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="text-purple-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Theme Preference</label>
              <div className="grid grid-cols-3 gap-4">
                {['light', 'dark', 'system'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updateSetting('appearance', 'theme', theme)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      settings.appearance.theme === theme
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                      theme === 'light' ? 'bg-yellow-400' :
                      theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-400 to-gray-800'
                    }`}></div>
                    <p className="text-sm font-medium capitalize">{theme}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Language</label>
              <select
                value={settings.appearance.language}
                onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;