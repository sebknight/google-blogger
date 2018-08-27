// Module requirements
const express = require("express");
const path = require("path");

// File calls
const config = require("./config");

// API calls
const {google} = require("googleapis");

// Initialisation of above (where necessary)
const app = express();

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
	blogId: `4236176886935208807`
};

// Use function echoes requests to the server.
app.use(function(req, res, next){
	console.log(`${req.method} request for ${req.url}`);
	next();
});

// Call for static files in public (i.e. images)
app.use(express.static(`./public`));

// Calls for Boostrap and jQuery. Required as files inside ./public cannot exit public
app.use(`/bootstrap`, express.static(path.join(__dirname, `node_modules/bootstrap/dist`)));
app.use(`/jquery`, express.static(path.join(__dirname, `node_modules/jquery/dist/jquery.min.js`)));

// GET request handling for "/" i.e. home.
app.get(`/`, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
// app.get(`/`, function(req,res){
// 	res.sendFile(`${__dirname}/public/index.html`);
// });

// Setup port handling
app.set(`port`, (process.env.PORT || 3000));

// Echo server port is running on.
app.listen(app.get(`port`), () => {
	console.log(`\x1b[42m%s\x1b[0m`, `Server is running on port ${app.get(`port`)}`);
});

// GET request calls for blog URL from BlogId using Blogger API
// blogger.blogs.get(params)
// 	.then((res) =>{
// 		console.log(`The blog url is ${res.data.url}`);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

// GET request calls for blog posts from BlogId using Blogger API
blogger.posts.list(params)
	.then((res) =>{
		// Log the first blog post's title.
		// Doing this to avoid the console being filled with JSON data.
		console.log(`First Post Title: ${res.data.items[0].title}`);
	})
	.catch(error => {
		console.log(error);
	});
