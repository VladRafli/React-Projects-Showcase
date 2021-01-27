import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainMenu from './Component/Main Menu/MainMenu';

export default function App() {
  return (
    <Router>
      <MainMenu />
    </Router>
  );
}