import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import './App.css'; // Import CSS file for styling
import DownloadButton from './components/DownloadButton';
import LogIn from './components/LogIn';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const App = () => {
  const [user, setUser] = useState();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <div className="app-container"> {/* Add a class for centering */}
      <h1>松ノ木 MP3 Downloader</h1>
      {user ? <DownloadButton auth={auth} /> : <LogIn auth={auth} onLogin={handleLogin} />}
    </div>
  );
};

export default App;
