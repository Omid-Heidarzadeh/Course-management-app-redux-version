import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div>
    <h1>Page not found.</h1>
    <Link to="/" className="btn btn-primary">
      Back to Home
    </Link>
  </div>
);

export default PageNotFound;
