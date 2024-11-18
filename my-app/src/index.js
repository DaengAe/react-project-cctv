import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Map from './Map';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
      <Map>
        <App />
      </Map>,
);

reportWebVitals();