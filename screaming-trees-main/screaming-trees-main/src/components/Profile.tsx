import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Edit3 } from 'lucide-react';
import { usePage } from '../context/PageContext';

const Profile = () => {
  const { currentPage } = usePage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Product designer passionate about creating exceptional user experiences. Love working on innovative projects that make a difference.',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (currentPage !== 'profile') return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your personal information and account settings.</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          <Edit3 size={20} className="mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={18} />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin size={18} />
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">Member since</p>
                <p className="text-sm font-semibold text-gray-900">January 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={isEditing ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={isEditing ? editedProfile.phone : profile.phone}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={isEditing ? editedProfile.location : profile.location}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                  className={`w-full p-3 border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                rows={4}
                value={isEditing ? editedProfile.bio : profile.bio}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg transition-colors resize-none ${
                  isEditing
                    ? 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Updated profile information', time: '2 hours ago', icon: User },
            { action: 'Changed notification settings', time: '1 day ago', icon: Bell },
            { action: 'Updated privacy preferences', time: '3 days ago', icon: Shield },
            { action: 'Changed theme to light mode', time: '1 week ago', icon: Palette },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Icon className="text-indigo-600" size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;