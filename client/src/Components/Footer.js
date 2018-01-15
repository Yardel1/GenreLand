import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <ul>
      <li>soundland © 2017</li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </div>
);

export default Footer;