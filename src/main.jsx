/**
 * SikshaPath - Application Entry Point
 * Instant single-pass rendering without StrictMode double-load flicker.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);
