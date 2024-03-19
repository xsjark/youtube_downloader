import React, { useState } from 'react';
import './DownloadButton.css';

const DownloadButton = ({ auth }) => {
  const [downloaded, setDownloaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  // const handleDownloadClick = async () => {
  //   const user = auth.currentUser;
  //   console.log(user)
  //   if (user) {
  //     const idToken = await user.getIdToken();
  //     const response = await fetch('http://localhost:3000/download', {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${idToken}`,
  //       },
  //     });
  //     // Handle the response as needed
  //   } else {
  //     // User is not signed in
  //     console.error('User is not signed in');
  //   }
  // };
  const downloadOnServer = async () => {
    const user = auth.currentUser;
    // if (user) {
    //   const idToken = await user.getIdToken();
    //   console.log(idToken)
    // }
    
    try {
      if (!user) return;
      if (isDownloading) return;
      setIsDownloading(true);
  
      const idToken = await user.getIdToken();

      const response = await fetch('http://localhost:3000/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`, // Include the ID token in the Authorization header
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
