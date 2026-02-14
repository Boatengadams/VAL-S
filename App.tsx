
import React, { useState, useEffect } from 'react';
import HeartBackground from './components/HeartBackground';
import CreatorPage from './components/CreatorPage';
import RecipientPage from './components/RecipientPage';
import { ViewType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>(ViewType.CREATOR);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // If there is a "to" parameter, we assume it's a link for a recipient
    if (params.get('to')) {
      setView(ViewType.RECIPIENT);
    } else {
      setView(ViewType.CREATOR);
    }
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden select-none">
      <HeartBackground />
      {view === ViewType.CREATOR ? <CreatorPage /> : <RecipientPage />}
    </div>
  );
};

export default App;
