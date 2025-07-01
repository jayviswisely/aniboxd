import React from 'react'
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const root = document.documentElement;
  if (darkMode) {
    root.classList.add('dark');
    root.style.setProperty('color-scheme', 'dark');
  } else {
    root.classList.remove('dark');
    root.style.setProperty('color-scheme', 'light');
  }
}, [darkMode]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-blue-anime text-white"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle