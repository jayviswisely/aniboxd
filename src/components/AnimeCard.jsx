import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWatchlist } from '../hooks/useWatchlist';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';

const AnimeCard = ({ anime }) => {
  const { user } = useAuth();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist(user?.uid);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isInWatchlist = watchlist.some(item => item.animeId === anime.id);

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

  const handleWatchlistAction = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    isInWatchlist ? removeFromWatchlist(anime.id) : addToWatchlist(anime);
  };

  return (
    <>
      <motion.div
        className="card-bg rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <motion.img 
          src={anime.coverImage.large} 
          alt={anime.title.english || anime.title.romaji}
          className="w-full h-64 object-cover"
          onError={(e) => e.target.src = 'https://placehold.co/300x400'}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg truncate text-theme">
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
              onClick={handleWatchlistAction}
            >
              {isInWatchlist ? '− Remove' : '+ Watchlist'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default AnimeCard;