const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { error } = require('console');

const connection = mysql.createConnection({
	host     : 'mysql',
	user     : 'sqluser',
	password : 'password',
	database : 'nodelogin'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err.stack);
    return;
  }
  console.log('Successfully connected to MySQL as id ' + connection.threadId);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './website/views'));
app.use(express.static(path.resolve(__dirname, './website/public')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// http://localhost:3000/
app.get('/', function(request, response) {
	username = request.query.username;
	response.render('login');
});


// http://localhost:3000/register
app.get('/register', function(request, response) {
	response.render('register');
});

app.post('/register', (req, res) => {
	const { username, email, password } = req.body;

	const sql = 'INSERT INTO accounts (username, email, password) VALUES (?, ?, ?)';
	connection.query(sql, [username, email, password], (err, result) => {
		if (err) {
			console.error('Error details:', err);
			res.status(500).send('Error registering user');
		} else {
			console.log('User registered successfully');
			res.redirect('/');
		}
	});
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
    if (request.session.loggedin) {
		response.render('upload', { user: request.session.username });
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	
});

// Logout endpoint
app.get('/logout', function(request, response) {
    // Destroy the session
    request.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            // Redirect to the homepage
            response.redirect('/');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
