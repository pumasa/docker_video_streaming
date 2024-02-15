const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const uploadsDir = '/storage_service/uploads';

// Serve static files from the "uploads" directory
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(uploadsDir));

// Endpoint to get a list of uploaded videos
app.get('/videos', (req, res) => {
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading directory');
        } else {
            res.json(files);
        }
    });
});

// Endpoint to stream a video file
app.get('/video/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);

    // Check if the file exists
    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(err);
            res.status(404).send('File not found');
        } else {
            // Stream the video file
            const range = req.headers.range;
            const fileSize = stat.size;

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize = (end - start) + 1;
                const file = fs.createReadStream(filePath, { start, end });
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunkSize,
                    "Content-Type": "video/mp4"
                };

                res.writeHead(206, headers);
                file.pipe(res);
            } else {
                const headers = {
                    "Content-Length": fileSize,
                    "Content-Type": "video/mp4"
                };
                res.writeHead(200, headers);
                fs.createReadStream(filePath).pipe(res);
            }
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
