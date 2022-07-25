import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')
);
