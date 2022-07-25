import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = { color: 'orange' };

function Header() {
  return (
    <nav className="nav align-items-center">
      <NavLink exact to="/" className="nav-link" activeStyle={activeStyle}>
        Home
      </NavLink>
      {' | '}
      <NavLink
        exact
        to="/courses"
        className="nav-link"
        activeStyle={activeStyle}
      >
        Courses
      </NavLink>
      {' | '}
      <NavLink to="/about" className="nav-link" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
}

export default Header;
