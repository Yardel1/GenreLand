import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="nav">
    <div className="lock-up">
      <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/1041163-200.png" alt="logo" />
      <Link to={`/`}> <h4>soundland</h4> </Link>
    </div>

    <div className="nav-buttons-align">
      <Link to={"/auth/login"} className="nav-button">Login </Link>
      <Link to={"/auth/register"} className="nav-button">Register</Link>
      <Link to={"/list"} className="nav-button">Events</Link>
    </div>

  </div>
);
export default Header;