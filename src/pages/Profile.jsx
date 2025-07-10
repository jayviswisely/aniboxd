import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWatchlist } from '../hooks/useWatchlist';
import AnimeCard from '../components/AnimeCard';

const Profile = () => {
  const { user } = useAuth();
  const { watched } = useWatchlist(user?.uid);
  const [activeTab, setActiveTab] = useState('watched'); // 'watched' or 'reviews'

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('watched')}
          className={`px-4 py-2 font-medium ${activeTab === 'watched' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        >
          Watched Anime
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        >
          Reviews
        </button>
      </div>

      {/* Watched Anime Tab */}
      {activeTab === 'watched' && (
        <div className="mb-10">
          {watched.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg">You haven't watched any anime yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {watched.map(item => (
                <AnimeCard 
                  key={item.animeId || item.id}
                  anime={{
                    id: item.animeId || item.id,
                    title: { 
                      english: item.title || "No title",
                      romaji: item.title || "No title" 
                    },
                    coverImage: { 
                      large: item.coverImage || "https://placehold.co/300x400" 
                    },
                    episodes: item.episodes || '?',
                    status: item.status || 'unknown',
                    averageScore: item.averageScore || 'N/A'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="text-center py-20">
          <p className="text-xl font-medium">Reviews coming soon!</p>
          <p className="text-gray-500 mt-2">We're working on this feature</p>
        </div>
      )}
    </div>
  );
};

export default Profile;