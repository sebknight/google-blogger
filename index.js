const express = require("express");
const path = require("path");
const config = require("./config");
const {google} = require("googleapis");

const app = express();

const blogger = google.blogger({
	version: `v3`,
	auth: config.bloggerKey
});

const params = {
	blogId: 3247312780602173037
};

app.use(function(req, res, next){
	console.log(`${req.method} request for ${req.url}`);
	next();
});

app.use(express.static(`./public`));

app.use(`/bootstrap`, express.static(path.join(__dirname, `node_modules/bootstrap/dist`)));
app.use(`/jquery`, express.static(path.join(__dirname, `node_modules/jquery/dist/jquery.min.js`)));


app.get(`/`, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
// app.get(`/`, function(req,res){
// 	res.sendFile(`${__dirname}/public/index.html`);
// });

app.set(`port`, (process.env.PORT || 3000));

app.listen(app.get(`port`), () => console.log(`Server is running on port ${app.get(`port`)}`));

// This type of call to the blogger API does not seem to work.
// blogger.blogs.get(params, function(err, res){
// 	if(err){
// 		console.error(err);
// 		throw err;
// 	}
// 	console.log((`The blog url is ${res.data.url}`));
// });

blogger.blogs.get(params)
	.then((res) =>{
		console.log(`The blog url is ${res.data.url}`);
	})
	.catch(error => {
		console.log(error);
	});
