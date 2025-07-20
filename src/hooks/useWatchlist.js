import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

export const useWatchlist = (userId) => {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    
    const unsubscribeWatchlist = onSnapshot(
      collection(db, 'users', userId, 'watchlist'),
      (snapshot) => {
        setWatchlist(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }
    );

    const unsubscribeWatched = onSnapshot(
      collection(db, 'users', userId, 'watched'),
      (snapshot) => {
        setWatched(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }
    );

    const unsubscribeReviews = onSnapshot(
      collection(db, 'users', userId, 'reviews'),
      (snapshot) => {
        setReviews(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          userId,
          userName: snapshot.metadata.fromCache ? '' : doc.data().userName || '',
          userPhoto: snapshot.metadata.fromCache ? '' : doc.data().userPhoto || ''
        })));
      }
    );

    return () => {
      unsubscribeWatchlist();
      unsubscribeWatched();
      unsubscribeReviews();
    };
  }, [userId]);

  const addToWatchlist = async (anime) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', userId, 'watchlist', anime.id.toString()), {
        animeId: anime.id,
        title: anime.title.english || anime.title.romaji,
        coverImage: anime.coverImage.large,
        episodes: anime.episodes,
        status: anime.status || 'unknown',
        averageScore: anime.averageScore || 'N/A',
        nextAiringEpisode: anime.nextAiringEpisode || null,
        addedAt: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWatched = async (anime) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'users', userId, 'watchlist', anime.id.toString()));
      
      await setDoc(doc(db, 'users', userId, 'watched', anime.id.toString()), {
        animeId: anime.id,
        title: anime.title.english || anime.title.romaji,
        coverImage: anime.coverImage.large,
        episodes: anime.episodes,
        status: anime.status || 'unknown',
        averageScore: anime.averageScore || 'N/A',
        nextAiringEpisode: anime.nextAiringEpisode || null,
        watchedAt: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromList = async (animeId, listType = 'watchlist') => {
    await deleteDoc(doc(db, 'users', userId, listType, animeId.toString()));
  };

  const addReview = async (animeId, reviewData) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', userId, 'reviews', animeId.toString()), {
        animeId,
        ...reviewData,
        userName: reviewData.userName || '',
        userPhoto: reviewData.userPhoto || '',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (animeId, reviewData) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', userId, 'reviews', animeId.toString()), {
        ...reviewData,
        updatedAt: new Date()
      }, { merge: true });
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (animeId) => {
    await deleteDoc(doc(db, 'users', userId, 'reviews', animeId.toString()));
  };

  return { 
    watchlist, 
    watched,
    reviews,
    addToWatchlist, 
    addToWatched,
    removeFromList,
    addReview,
    updateReview,
    deleteReview,
    loading 
  };
};