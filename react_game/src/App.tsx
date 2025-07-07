import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Ensure AOS CSS is imported
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import Msg from './pages/Msg';
import Profile from './pages/Profile';
import Session from './pages/Session';

const App: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Router>
      {/* Flex layout to keep footer at bottom */}
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/msg" element={<Msg />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/session" element={<Session />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
