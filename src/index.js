import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('app')
);

module.hot.accept();
