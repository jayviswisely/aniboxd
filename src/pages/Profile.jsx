import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWatchlist } from '../hooks/useWatchlist';
import AnimeCard from '../components/AnimeCard';
import ReviewCard from '../components/ReviewCard';

const Profile = () => {
  const { user } = useAuth();
  const { watched, reviews } = useWatchlist(user?.uid);
  const [activeTab, setActiveTab] = useState('watched'); // 'watched' or 'reviews'

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={user?.photoURL} 
          alt={user?.displayName}
          className="w-16 h-16 rounded-full"
          onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=' + user?.displayName}
        />
        <div>
          <h1 className="text-2xl font-bold">{user?.displayName || 'Your Profile'}</h1>
          <p className="text-gray-500">
            {watched.length} anime watched • {reviews.length} reviews
          </p>
        </div>
      </div>
      
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
                    averageScore: item.averageScore || 'N/A',
                    nextAiringEpisode: item.nextAiringEpisode || null
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div>
          {reviews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg">You haven't reviewed any anime yet</p>
              <p className="text-gray-500">Reviews you write will appear here</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 lg:w-1/5">
                    <AnimeCard 
                      anime={{
                        id: review.animeId,
                        title: { 
                          english: review.animeTitle,
                          romaji: review.animeTitle
                        },
                        coverImage: { 
                          large: review.animeCover || "https://placehold.co/300x400" 
                        }
                      }}
                    />
                  </div>
                  <div className="md:w-3/4 lg:w-4/5">
                    <ReviewCard 
                      review={review}
                      isOwner={true}
                      onEdit={() => {
                        // This would navigate to the anime page with review form open
                        window.location.href = `/anime/${review.animeId}`;
                      }}
                      onDelete={() => {
                        if (window.confirm('Delete this review?')) {
                          deleteReview(review.animeId);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;