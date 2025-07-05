import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Post from './pages/Post';
import Msg from './pages/Msg';
import Profile from './pages/Profile';

const App: React.FC = () => {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Navigate to="/Post" />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/" element={<Navigate to="/Msg" />} />
        <Route path="/Msg" element={<Msg />} />
        <Route path="/" element={<Navigate to="/Profile" />} />
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
