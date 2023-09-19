import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import getRouter from './router';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

function renderRoot() {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={getRouter()} />
      </HelmetProvider>
    </React.StrictMode>
  );
}

if (import.meta.env.MODE === 'development' && import.meta.env.VITE_MSW_ENABLED === 'true') {
  // When development, setup the MSW.
  // import the worker (under the browser.ts file)
  const { worker } = await import('./mocks/browser');
  await worker.start();
  renderRoot();
} else {
  // Render the application in production without the MSW.
  renderRoot();
}
