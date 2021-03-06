// Module requirements
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

// File calls
const config = require("./config");

// API calls
const {google} = require("googleapis");

// Initialisation of above (where necessary)
const app = express();

// Body Parser Initialisation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support url encoded bodies

// The use function echoes requests to the server
app.use(function(req, res, next){
	console.log(`${req.method} request for ${req.url}`);
	next();
});

// Call for static files in public (i.e. images)
app.use(express.static(`./public`));

// Call for jQuery. Required as files inside ./public cannot exit ./public
app.use(`/jquery`, express.static(path.join(__dirname, `node_modules/jquery/dist/jquery.min.js`)));

// Blogger API call from googleapis package.
// Calling for latest version "3"
// Using authentication method API key from config file
const blogger = google.blogger({
	version: `v3`,
	auth: config.bloggerKey
});

// POST request on form submit
app.post('/formSubmit', function(req, res){
	// Define parameters of GET request
	let params = {
		blogId: `4236176886935208807`,
		q: req.body.query,
		// Doesn't fetch body content of posts (to save data during testing)
		fetchBodies: false,
	}

	// Call for data with provided filter from search Query.
	// (There's probably a better way of doing this from an infosec perspective)
	blogger.posts.search(params)
		.then((res) => {
			// console.log(searchQuery);

			// Log the first blog post
			// Doing this to avoid the console being filled with JSON data.
			console.log(res.data.items[0]);
		})
		.catch(error => {
			console.log(error);
		});

	res.writeHead(302, {"Location": "/"});
	res.end();
});

// GET request handling for "/" i.e. home.
app.get(`/`, (req, res) => res.sendFile(`${__dirname}/public/home.html`));

// Setup port handling
app.set(`port`, (process.env.PORT || 3000));

// Echo server port is running on
app.listen(app.get(`port`), () => {
	// `x1b[42m]%s\x1b[0m]` sets the text background color to green, and then resets to normal colours afterwards.
	console.log(`\x1b[42m%s\x1b[0m`, `Server is running on port ${app.get(`port`)}`);
});
