import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

export const useWatchlist = (userId) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Real-time updates
  useEffect(() => {
    if (!userId) return;
    
    const unsubscribe = onSnapshot(
      collection(db, 'users', userId, 'watchlist'),
      (snapshot) => {
        setWatchlist(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }
    );
    return unsubscribe;
  }, [userId]);

  const addToWatchlist = async (anime) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', userId, 'watchlist', anime.id.toString()), {
        animeId: anime.id,
        title: anime.title.english || anime.title.romaji,
        coverImage: anime.coverImage.large,
        addedAt: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (animeId) => {
    await deleteDoc(doc(db, 'users', userId, 'watchlist', animeId.toString()));
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, loading };
};