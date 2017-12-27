var keystone = require('keystone');
var router = require('express').Router();

var User = keystone.list('User');

function signin(req, res) {
    
    if (!req.body.username || !req.body.password) return res.err('Username and password are required to signin.');
    
    keystone.list('User').model.findOne({ email: req.body.username }).exec(function(err, user) {
      
        if (err || !user) {
            return res.json({
                success: false,
                session: false,
                message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
            });
        }
      
        keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function(user) {
        
            return res.json({
                success: true,
                session: true,
                date: new Date().getTime(),
                userId: user.id
            });
        
        }, function(err) {
        
            return res.json({
                success: true,
                session: false,
                message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
            });
        });  
    });
}

function signout(req, res) {
    keystone.session.signout(req, res, function() {
      res.json({ 'signedout': true });
    });
}

router.route('/signin')
.post(signin);

router.route('/signout')
.post(signout);

module.exports = router;