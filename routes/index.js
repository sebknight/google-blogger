// Every individual file needs to call the modules that they are using.
// This file is only using express, so it needs to call for express.
const express = require("express");

// Setup routing in this file
const router = express.Router();

// Handling of GET request for "/".
router.get(`/`, function(req,res){
	// Call for a file existing in the defaultLayout specified in ./index.js
	// The rendering involves the given variables.
	res.render(`home/index`, { title: `Google Blogger API` });
});

module.exports = router;
