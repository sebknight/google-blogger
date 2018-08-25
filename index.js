const express = require("express");
const path = require("path");
const config = require("./config");
const {google} = require("googleapis");
const blogger = google.blogger({
	version: 'v3',
	auth: config.bloggerKey
});
const params = {
	blogID: 4236176886935208807
};

const app = express();

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

blogger.blogs.get(params, (err, res) => {
	if (err) {
		console.error(err);
		throw err;
	}
	console.log((`The blog url is ${res.data.url}`));
	
});