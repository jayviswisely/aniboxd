import React from 'react'
import { motion } from 'framer-motion'
import { useWatchlist } from '../hooks/useWatchlist';
import { useAuth } from '../hooks/useAuth';

const AnimeCard = ({ anime }) => {
  const { user } = useAuth();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist(user?.uid);
  const isInWatchlist = watchlist.some(item => item.animeId === anime.id);

  // Status mapping
  const getStatusLabel = (status) => {
    if (!status) return 'unknown';
    
    const statusMap = {
      'FINISHED': 'Completed',
      'RELEASING': 'Ongoing',
      'NOT_YET_RELEASED': 'Upcoming',
      'CANCELLED': 'Cancelled',
      'HIATUS': 'Hiatus'
    };
    
    return statusMap[status.toUpperCase()] || status.toLowerCase();
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Poster Image with Enhanced Hover */}
      <motion.img 
        src={anime.coverImage.large} 
        alt={anime.title.english || anime.title.romaji}
        className="w-full h-64 object-cover"
        onError={(e) => e.target.src = 'https://placehold.co/300x400'}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />

      {/* Title + Buttons - Now with Dark Mode Support */}
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate anime-card-title">
            {anime.title.english || anime.title.romaji}
        </h3>
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{anime.episodes || '?'} eps</span>
          <span className="capitalize">
            {getStatusLabel(anime.status)}
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-yellow-500 font-bold">
            ⭐ {anime.averageScore || 'N/A'}
          </span>
          <motion.button 
            className={`px-3 py-1 rounded text-sm transition-colors ${
              isInWatchlist 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isInWatchlist 
              ? removeFromWatchlist(anime.id) 
              : addToWatchlist(anime)
            }
          >
            {isInWatchlist ? '− Remove' : '+ Watchlist'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default AnimeCard