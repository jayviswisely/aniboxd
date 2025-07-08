import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWatchlist } from '../hooks/useWatchlist';
import AnimeCard from '../components/AnimeCard';

const Profile = () => {
  const { user } = useAuth();
  const { watched } = useWatchlist(user?.uid);

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Watched Anime</h2>
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
    </div>
  );
};

export default Profile;