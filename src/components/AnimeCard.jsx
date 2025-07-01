import React from 'react'

const AnimeCard = ({ anime }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Poster Image */}
      <img 
        src={anime.coverImage.large} 
        alt={anime.title.english || anime.title.romaji}
        className="w-full h-64 object-cover"
        onError={(e) => e.target.src = 'https://placehold.co/300x400'}
      />

      {/* Title + Buttons */}
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {anime.title.english || anime.title.romaji}
        </h3>
        <div className="mt-3 flex justify-between items-center">
            <span className="text-yellow-500 font-bold">
                ⭐ {anime.averageScore || 'N/A'}
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                + Watchlist
            </button>
            </div>
      </div>
    </div>
  )
}

export default AnimeCard