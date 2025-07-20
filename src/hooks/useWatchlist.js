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

  return { 
    watchlist, 
    watched,
    addToWatchlist, 
    addToWatched,
    removeFromList, 
    loading 
  };
};