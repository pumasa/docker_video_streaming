const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: '10.20.30.6',
	user: 'mike',
	password: 'password',
	database: 'nodelogin'
});

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../website/views'));

app.use(express.static(path.resolve(__dirname, '../website/public')));

// Define routes
app.get('/:username', (req, res) => {
    const username = req.params.username;
    const selectQuery = "SELECT filename FROM videos WHERE username = ?";
    connection.query(selectQuery, [username], (err, results) => {
        if (err) {
            console.error('Error retrieving filenames from database:', err);
            res.status(500).send('Error retrieving filenames from database');
            return;
        }
        
        // Extract filenames from the results
        const videoFiles = results.map(row => row.filename);
        
        // Render the video.ejs template with the retrieved video files
        res.render('video', { videoFiles: videoFiles, user: username });
    });
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});