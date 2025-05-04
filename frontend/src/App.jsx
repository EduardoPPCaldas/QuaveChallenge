import React from 'react';
import './styles/main.css';
import EventCheckInPage from './pages/EventCheckInPage';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Check-in System</h1>
        <EventCheckInPage/>
    </div>
  );
}

export default App; 