import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="card-bg rounded-lg overflow-hidden shadow-md border transition-colors duration-300">
      <div className="w-full h-64 bg-gray-loading animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-loading rounded w-3/4 animate-pulse"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-loading rounded w-1/4 animate-pulse"></div>
          <div className="h-3 bg-gray-loading rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-loading rounded w-1/4 animate-pulse"></div>
          <div className="h-8 bg-blue-anime/20 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard