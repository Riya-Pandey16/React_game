// src/pages/Home.tsx
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroAnimation from '../assets/hero.json';

import { BsFillChatDotsFill, BsFillPeopleFill, BsFillPersonLinesFill, BsFillShareFill } from 'react-icons/bs';

const Home: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-light min-vh-100 pt-4">
      {/* Hero Section */}
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">
        <div className="text-center text-md-start mb-4 mb-md-0" data-aos="fade-right">
          <h1 className="display-4 fw-bold text-primary">Welcome to UniConnect</h1>
          <p className="lead text-secondary">
            A student social platform to share knowledge, connect with peers, and grow together.
          </p>
        </div>
        <div style={{ maxWidth: 400 }} data-aos="fade-left">
          <Lottie animationData={heroAnimation} loop />
        </div>
      </div>

      {/* Features */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3" data-aos="fade-up">
            <div className="card shadow border-0 h-100 text-center p-3">
              <div className="text-danger display-4"><BsFillShareFill /></div>
              <h5 className="fw-bold mt-3">Share Posts</h5>
              <p className="text-muted">Post ideas, videos, notes, and academic resources. See what others are sharing!</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div className="card shadow border-0 h-100 text-center p-3">
              <div className="text-primary display-4"><BsFillChatDotsFill /></div>
              <h5 className="fw-bold mt-3">Message Friends</h5>
              <p className="text-muted">Chat directly with students from any year or branch and clear doubts together.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div className="card shadow border-0 h-100 text-center p-3">
              <div className="text-success display-4"><BsFillPeopleFill /></div>
              <h5 className="fw-bold mt-3">Join Sessions</h5>
              <p className="text-muted">Attend or host group sessions and collaborative study events.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div className="card shadow border-0 h-100 text-center p-3">
              <div className="text-warning display-4"><BsFillPersonLinesFill /></div>
              <h5 className="fw-bold mt-3">Your Profile</h5>
              <p className="text-muted">Showcase your branch, year, skills, and connect with others academically.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
