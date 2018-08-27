console.log("JS: Ready");

$.ajax({
	type: "GET",
	url: "http://192.168.33.10:3000/posts",
	dataType: "json",
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log("Error "+err.status);
		console.log(err);
	}
});
