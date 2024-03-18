import React, { useState } from 'react';
import './DownloadButton.css';

const DownloadButton = () => {
  const [downloaded, setDownloaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const downloadOnServer = async () => {
    try {
      if (isDownloading) return;
      setIsDownloading(true);

      const response = await fetch('http://localhost:3000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
      });
      if (response.ok) {
        setDownloaded(true);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="centered-layout">
      <input type="text" value={videoUrl} onChange={handleUrlChange} placeholder="Enter YouTube video URL" />
      <button onClick={downloadOnServer} disabled={downloaded || isDownloading}>Download MP3</button>
      {downloaded && <a href="http://localhost:3000/download-file" download>Download from Server</a>}
    </div>
  );
};

export default DownloadButton;
