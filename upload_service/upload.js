const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const connection = mysql.createConnection({
	host: 'mysql',
	user: 'sqluser',
	password: 'password',
	database: 'nodelogin'
});

connection.connect((err) => {
	if (err) {
        console.error('Error connecting to MySQL: ', err.stack);
return;
	}
	console.log('Successfully connected to MySQL as id ' + connection.threadId);
});

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../storage_service/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage
}).single('video');

// Upload endpoint
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send('Error uploading file');
        } else {
            // Save the filename of the uploaded video to the database
            const videoName = req.file.filename;
            const userId = req.body.user;
            const insertQuery = "INSERT INTO videos (username, filename) VALUES (?, ?)";
            connection.query(insertQuery, [userId, videoName], (err, result) => {
                if (err) {
                    console.error('Error inserting video into database:', err);
                    res.status(500).send('Error inserting video into database');
                    return;
                }
                res.redirect('http://localhost:3000/home');
            });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
