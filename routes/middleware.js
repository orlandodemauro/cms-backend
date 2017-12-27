/**
	Prevents people from accessing protected API when they're not signed in
 */
exports.checkAuth = function (req, res, next) {
	if (!req.user) {
		res.notAuth();
	} else {
		next();
	}
};


/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function(req, res, next) {
    
  res.err = function(err) {
		res.status(500);
		res.json({ "error": err})
  }
    
  res.notfound = function() {
		res.status(404);
		res.json({ "error": "element not found" })
	}
	
	res.notAuth = function() {
		res.status(403);
		res.json({ "error": "admin permission are needed to complete the operation" })
  }
    
  next();
    
};