import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../api/anilist';
import AnimeCard from '../components/AnimeCard';
import ReviewForm from '../components/ReviewForm';
import ReviewCard from '../components/ReviewCard';
import { useAuth } from '../hooks/useAuth';
import { useWatchlist } from '../hooks/useWatchlist';

const AnimePage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const { user } = useAuth();
  const { reviews, addReview, updateReview, deleteReview } = useWatchlist(user?.uid);

  const userReview = reviews.find(r => r.animeId === id);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimeDetails(id);
        if (!data) {
          throw new Error('Anime not found');
        }
        setAnime(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAnime();
  }, [id]);

  const handleReviewSubmit = async (reviewData) => {
  try {
    if (userReview) {
      await updateReview(id, {
        rating: reviewData.rating,
        text: reviewData.text,
        isSpoiler: reviewData.isSpoiler,
        updatedAt: new Date()
      });
    } else {
      await addReview(id, {
        rating: reviewData.rating,
        text: reviewData.text,
        isSpoiler: reviewData.isSpoiler,
        animeTitle: anime.title.english || anime.title.romaji,
        animeCover: anime.coverImage.large,
        userName: user.displayName || "Anonymous",
        userPhoto: user.photoURL || "",
        userId: user.uid
      });
    }
    setShowReviewForm(false);
  } catch (error) {
    console.error("Failed to save review:", error);
    alert("Failed to save review. Please try again.");
  }
};

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!anime) return <div className="container mx-auto p-4">Anime not found</div>;

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <AnimeCard anime={anime} />
        </div>
        
        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl font-bold mb-2">
            {anime.title.english || anime.title.romaji}
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              {anime.description?.replace(/<[^>]*>/g, '') || 'No description available.'}
            </p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            
            {user ? (
              !userReview ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Write a Review
                </button>
              ) : !showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit Your Review
                </button>
              ) : null
            ) : (
              <p className="mb-6">Login to write a review</p>
            )}
            
            {showReviewForm && (
              <ReviewForm
                anime={anime}
                existingReview={userReview}
                onSubmit={(reviewData) => handleReviewSubmit({
                  ...reviewData,
                  animeTitle: anime.title.english || anime.title.romaji,
                  animeCover: anime.coverImage.large
                })}
                onCancel={() => setShowReviewForm(false)}
              />
            )}
            
            <div className="space-y-4">
              {reviews.filter(r => r.animeId === id).map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isOwner={review.userId === user?.uid}
                  onEdit={() => setShowReviewForm(true)}
                  onDelete={() => deleteReview(id)}
                />
              ))}
              
              {reviews.filter(r => r.animeId === id).length === 0 && (
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;