import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
    <div className="container">
      <Link className="navbar-brand fw-bold" to="/home">UniConnect</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {['home', 'sessions', 'msg', 'post'].map(item => (
            <li key={item} className="nav-item">
              <NavLink
                to={`/${item}`}
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="d-flex">
          <Link className="nav-link text-white fw-semibold me-3" to="/profile">Profile</Link>
          <Link className="btn btn-outline-light btn-sm" to="/login">Logout</Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
