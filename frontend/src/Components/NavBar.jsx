import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <Link to="/">ColorUp !</Link>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/">Home</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/contact">Contact</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/about">About</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/login">Login</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link to="/register">Register</Link>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
