import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, collection, onSnapshot } from 'firebase/firestore';

export const useWatchlist = (userId) => {
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);

  // Real-time updates for both collections
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

    return () => {
      unsubscribeWatchlist();
      unsubscribeWatched();
    };
  }, [userId]);

  const addToWatchlist = async (anime) => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', userId, 'watchlist', anime.id.toString()), {
        animeId: anime.id,
        title: anime.title.english || anime.title.romaji,
        coverImage: anime.coverImage.large,
        addedAt: new Date(),
        status: 'to_watch'
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWatched = async (anime) => {
    setLoading(true);
    try {
      // Remove from watchlist if it exists there
      await deleteDoc(doc(db, 'users', userId, 'watchlist', anime.id.toString()));
      
      // Add to watched collection
      await setDoc(doc(db, 'users', userId, 'watched', anime.id.toString()), {
        animeId: anime.id,
        title: anime.title.english || anime.title.romaji,
        coverImage: anime.coverImage.large,
        watchedAt: new Date(),
        status: 'watched'
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromList = async (animeId, listType = 'watchlist') => {
    await deleteDoc(doc(db, 'users', userId, listType, animeId.toString()));
  };

  return { 
    watchlist, 
    watched,
    addToWatchlist, 
    addToWatched,
    removeFromList, 
    loading 
  };
};