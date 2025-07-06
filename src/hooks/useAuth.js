import { useEffect, useState } from 'react';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  const loginWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error; // Re-throw for error handling in components
    }
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, loading, loginWithGoogle, logout };
};