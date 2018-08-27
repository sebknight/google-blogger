// Module requirements
const express = require("express");
const path = require("path");
const fs = require("fs");

// File calls
const config = require("./config");

// API calls
const {google} = require("googleapis");

// Initialisation of above (where necessary)
const app = express();
// Initialisation of body parser - note this needs to be installed via npm (see package)
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); // support encoded bodies

var searchQuery;
// Use function echoes requests to the server.
app.use(function(req, res, next){
	console.log(`${req.method} request for ${req.url}`);
	next();
});

// Call for static files in public (i.e. images)
app.use(express.static(`./public`));

// Calls for Bootstrap and jQuery. Required as files inside ./public cannot exit public
app.use(`/bootstrap`, express.static(path.join(__dirname, `node_modules/bootstrap/dist`)));
app.use(`/jquery`, express.static(path.join(__dirname, `node_modules/jquery/dist/jquery.min.js`)));

// Blogger API call from googleapis package.
// Calling for latest version "3"
// Using authentication method API key from config file
const blogger = google.blogger({
	version: `v3`,
	auth: config.bloggerKey
});

// Parameters for the GET request on the Blogger API
// BlogId relates to the blog we're calling data from.
const params = {
	blogId: `4236176886935208807`,
	q: searchQuery,
	// Doesn't fetch body content of posts (to save data during testing)
	fetchBodies: false,
};

app.get(`/`, (req, res) => res.sendFile(`${__dirname}/public/index.html`));

//POST request on form submit
app.post('/formSubmit', function(req, res){
	console.log("inside form post");
	// This is part of body parser (sending response)
	res.send(req.body.title);
	// Define searchQuery (there's probably a better way of doing this from an infosec perspective)
	searchQuery = req.body.title;
	console.log(searchQuery);

	// This is the GET request for the blogger API
	blogger.posts.list(params)
		.then((res) => {
			//Log searchQuery
			console.log(searchQuery);
			// Log the first blog post
			// Doing this to avoid the console being filled with JSON data.
			console.log(res.data.items[0]);
		})
		.catch(error => {
			console.log(error);
		})	;
});

// Setup port handling
app.set(`port`, (process.env.PORT || 3000));

// Echo server port is running on.
app.listen(app.get(`port`), () => {
	console.log(`Server is running on port ${app.get(`port`)}`);
});


