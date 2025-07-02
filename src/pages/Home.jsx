import React from 'react'
import { useState, useEffect } from 'react';
import { fetchAnimeList } from '../api/anilist';
import AnimeCard from '../components/AnimeCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx';

const Home = ({ searchQuery }) => {
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const loadData = async () => {
        try {
          setIsLoading(true);
          const { data, error: apiError } = await fetchAnimeList(searchQuery, page);
          
          console.log("API Data:", data); // Debug log
          
          if (apiError || !data?.Page?.media) {
            setError('Failed to load anime data');
            setAnimeList([]);
          } else {
            setAnimeList(data.Page.media);
            setError(null);
          }
        } catch (err) {
          setError('Network error occurred');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, page]);

  return (
    <div className="container mx-auto p-4 transition-colors duration-300 min-h-screen">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      {/* Results Title */}
      <h1 className="text-2xl font-bold mb-6 text-theme">
        {searchQuery ? 'Search Results' : 'Featured Anime'}
      </h1>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading ? (
          Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : animeList.length > 0 ? (
          animeList.map(anime => <AnimeCard key={anime.id} anime={anime} />)
        ) : (
          <div className="col-span-full text-center py-10 dark:text-gray-300">
            No anime found {searchQuery && `for "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && animeList.length > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 dark:text-white">Page {page}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;