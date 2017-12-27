/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/api directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
//var importRoutes = keystone.importer(__dirname);


keystone.pre('routes', middleware.initErrorHandlers);

// Setup Route Bindings
exports = module.exports = function (app) {
	// Add headers
	app.use(function (req, res, next) {
	
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
	
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	
		res.setHeader("Accept", "application/json");    
	
		// Pass to next layer of middleware
		next();
	});
	
	
	app.all('*', function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	  res.header('Accept', 'application/json');  
	  next();
	});
	
	app.all('/user*', middleware.checkAuth)
	app.use('/', keystone.middleware.api, require('./api'));

};
