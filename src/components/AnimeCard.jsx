import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWatchlist } from '../hooks/useWatchlist';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  const { user } = useAuth();
  const { 
    watchlist, 
    watched, 
    addToWatchlist, 
    addToWatched, 
    removeFromList, 
    loading 
  } = useWatchlist(user?.uid);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  const isInWatchlist = watchlist.some(item => item.animeId === anime.id);
  const isWatched = watched.some(item => item.animeId === anime.id);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleAction = (action) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    switch(action) {
      case 'add_to_watchlist':
        addToWatchlist(anime);
        break;
      case 'mark_as_watched':
        addToWatched(anime);
        break;
      case 'remove':
        if (isWatched) {
          removeFromList(anime.id, 'watched');
        } else {
          removeFromList(anime.id, 'watchlist');
        }
        break;
    }
    setShowDropdown(false);
  };

  const formatEpisodes = () => {
    if (!anime.episodes) return '?';
    
    // For ongoing/releasing anime, show current/total if available
    if (anime.status === 'RELEASING' || anime.status === 'releasing') {
      const released = anime.nextAiringEpisode?.episode 
        ? anime.nextAiringEpisode.episode - 1 
        : '?';
      const total = anime.episodes || '?';
      return `${released}/${total}`;
    }
    
    // For completed anime, show total episodes
    if (anime.status === 'FINISHED' || anime.status === 'finished') {
      return `${anime.episodes}/${anime.episodes}`;
    }
    
    // For other cases, just show total episodes
    return `?/${anime.episodes}`;
  };

  return (
    <div className="relative" style={{ zIndex: showDropdown ? 10 : 'auto' }}>
    
      <motion.div
        className="card-bg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Link to={`/anime/${anime.id}`} className="block">
          <motion.img 
            src={anime.coverImage.large} 
            alt={anime.title.english || anime.title.romaji}
            className="w-full h-64 object-cover rounded-t-lg"
            onError={(e) => e.target.src = 'https://placehold.co/300x400'}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <div className="p-4">
          <h3 className="font-semibold text-lg truncate text-theme">
              {anime.title.english || anime.title.romaji}
          </h3>
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{formatEpisodes()} eps</span>
            <span className="capitalize">
              {getStatusLabel(anime.status)}
            </span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-yellow-500 font-bold">
              ⭐ {anime.averageScore || 'N/A'}
            </span>
            
            <div className="relative">
              <motion.button 
                ref={buttonRef}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  isWatched 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : isInWatchlist 
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
              >
                {isWatched ? '✓ Watched' : isInWatchlist ? 'In Watchlist' : 'Add to List'}
              </motion.button>
              
              {showDropdown && (
                <motion.div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-700 rounded shadow-lg z-50 border border-gray-200 dark:border-gray-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    pointerEvents: 'auto' // Ensure dropdown can be interacted with
                  }}
                >
                  {isWatched ? (
                    <>
                      <button 
                        onClick={() => handleAction('remove')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Remove
                      </button>
                      <button 
                        onClick={() => handleAction('add_to_watchlist')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Add to Watchlist
                      </button>
                    </>
                  ) : isInWatchlist ? (
                    <>
                      <button 
                        onClick={() => handleAction('mark_as_watched')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Mark as Watched
                      </button>
                      <button 
                        onClick={() => handleAction('remove')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleAction('add_to_watchlist')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Add to Watchlist
                      </button>
                      <button 
                        onClick={() => handleAction('mark_as_watched')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Mark as Watched
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default AnimeCard;