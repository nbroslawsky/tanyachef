var broadway = require('broadway'),
	app = new broadway.App(),
	path = require('path');

var pathToDropbox = path.join(__dirname,'../../Dropbox/blog'),
	siteSections = [ 'Recipes' ];

app.use(require('./plugins/watcher'), { path : pathToDropbox, recursive : true });
app.use(require('./plugins/express'));
app.use(require('./plugins/blog-sections'), { base : pathToDropbox, sections : siteSections });
// app.use(require('./plugins/routing'));


app.init(function(err) {
	if(err) {
		throw new Error(err);
	}

	app.express.listen(80);
	console.log('Listening on port 80');
});


/*

app.get('/hello.txt', function(req, res){
	console.log('Hello!');
	var body = 'Hello World';
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

app.listen(80);
*/