var broadway = require('broadway'),
	app = new broadway.App(),
	path = require('path');

var pathToDropbox = '/home/nbroslawsky/Dropbox/tanyachef.com',
	siteSections = {
		'Home' : false,
		'New Consultants' : true,
		'Bookings' : true,
		'Fundraisers' : true,
		'Recruiting' : true,
		'Host Coaching' : true,
		'Recipes' : true
	};

app.use(require('./plugins/static'));
app.use(require('./plugins/settings'));
app.use(require('./plugins/email'));
app.use(require('./plugins/watcher'), { path : pathToDropbox, recursive : true });
app.use(require('./plugins/db'));
app.use(require('./plugins/express'));
app.use(require('./plugins/blog-sections'), { base : pathToDropbox, sections : siteSections });
app.use(require('./plugins/router'), { base : pathToDropbox, sections : Object.keys(siteSections) });

app.init(function(err) {
	if(err) {
		throw new Error(err);
	}

	app.express.listen(80);
	console.log('Listening on port 80');
});