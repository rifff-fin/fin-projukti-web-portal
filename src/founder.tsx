import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { FounderApp } from './FounderApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FounderApp />
  </StrictMode>,
);
