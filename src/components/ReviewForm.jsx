import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const ReviewForm = ({ anime, existingReview, onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState(existingReview?.text || '');
  const [isSpoiler, setIsSpoiler] = useState(existingReview?.isSpoiler || false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.text);
      setIsSpoiler(existingReview.isSpoiler);
    }
  }, [existingReview]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;
  
  try {
    const reviewData = {
      rating,
      text: reviewText,
      isSpoiler,
      animeId: anime.id,
      animeTitle: anime.title.english || anime.title.romaji,
      animeCover: anime.coverImage.large,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userId: user.uid
    };
    
    await onSubmit(reviewData);
  } catch (error) {
    console.error("Review submission error:", error);
  }
};

  return (
    <motion.div 
      className="card-bg p-4 rounded-lg shadow-md mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-bold mb-2">Your Review</h3>
      <div className="flex mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl focus:outline-none"
            aria-label={`Rate ${star} star`}
          >
            {star <= rating ? '★' : '☆'}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-2 border rounded mb-2 min-h-[100px]"
          required
        />
        <div className="flex items-center mb-3">
          <input
            type="checkbox"
            id="spoiler"
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="spoiler">Contains spoilers</label>
        </div>
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={!rating || !reviewText}
          >
            {existingReview ? 'Update' : 'Post'} Review
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;