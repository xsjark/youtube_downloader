const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

const server = express();
const port = 3000;

// Enable CORS
server.use(cors());

// Get the absolute path to the storage folder
const storagePath = path.join(__dirname, 'storage');

// Ensure the storage folder exists, if not, create it
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
}

server.use(express.json());

server.post('/download', async (req, res) => {
    try {
        const videoUrl = req.body.url;
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { filter: 'audioandvideo' });

        if (!format) {
            return res.status(400).send('Error: No audio format found');
        }

        const filePath = path.join(storagePath, 'audio.mp3');

        ytdl(videoUrl, { format: format })
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
                res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
                res.sendFile(filePath);
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.get('/download-file', (req, res) => {
    const filePath = path.join(storagePath, 'audio.mp3');
    res.download(filePath, 'audio.mp3', (err) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('File downloaded successfully');
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
