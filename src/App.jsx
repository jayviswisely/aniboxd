import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import AnimePage from "./pages/AnimePage";
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;