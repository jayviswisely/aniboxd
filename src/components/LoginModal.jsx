import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const LoginModal = ({ onClose }) => {
  const { user, loginWithGoogle, loading } = useAuth();
  
  if (user) return null;

  return (
    <div className="fixed inset-0 color-bg-primary dark:color-bg-primary bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-bold mb-4 text-white">
          Login Required
        </h3>
        <p className="mb-6 text-white">
          You need to login to access this feature.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={loginWithGoogle}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login with Google'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;