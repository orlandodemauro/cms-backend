// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'cmsApi',
	'brand': 'cmsApi',
	'auto update': false,
	'session': true,
    'auth': true,
	'user model': 'User',
	'static': 'public',
});

// Load your project's Models
keystone.import('models');

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Start Keystone to connect to your database and initialise the web server

keystone.start();