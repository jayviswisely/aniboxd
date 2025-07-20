import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review, isOwner, onEdit, onDelete }) => {
  return (
    <motion.div 
      className="card-bg p-4 rounded-lg shadow-md mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start mb-2">
        <Link to={`/profile/${review.userId}`} className="flex items-center">
          <img 
            src={review.userPhoto} 
            alt={review.userName}
            className="w-10 h-10 rounded-full mr-3"
            onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=' + review.userName}
          />
          <div>
            <h4 className="font-medium">{review.userName}</h4>
            <p className="text-sm text-gray-500">
              {review.createdAt?.toDate?.().toLocaleDateString() || 'Unknown date'}
            </p>
          </div>
        </Link>
        <div className="ml-auto text-lg">
          {Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
              {i < review.rating ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>
      
      {review.isSpoiler && (
        <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-3 text-sm">
          ⚠️ This review contains spoilers
        </div>
      )}
      
      <p className="whitespace-pre-line">{review.text}</p>
      
      {isOwner && (
        <div className="flex justify-end mt-3 space-x-2">
          <button 
            onClick={onEdit}
            className="text-sm text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button 
            onClick={onDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewCard;