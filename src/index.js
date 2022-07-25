import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById('app')
);
