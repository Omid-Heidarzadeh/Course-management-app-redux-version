import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Courses Administration</h1>
      <p>React, Redux and React-Router for ultra-responsive apps.</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn more
      </Link>
    </div>
  );
}

export default HomePage;
