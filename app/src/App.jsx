import React from 'react';
import DownloadButton from './components/DownloadButton';
import './App.css'; // Import CSS file for styling

const App = () => {
  return (
    <div className="app-container"> {/* Add a class for centering */}
      <h1>松ノ木 MP3 Downloader</h1>
      <DownloadButton />
    </div>
  );
};

export default App;
