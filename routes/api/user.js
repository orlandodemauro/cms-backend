var keystone = require('keystone');
var router = require('express').Router();

var User = keystone.list('User');

/**
 * List of User models
 */
var getAllUsers = function(req, res) {
  User.model.find(function(err, items) {

    if (err) return res.err(err);

    res.json({
      data: items
    });

  });
}

/**
 * Get User by email
 */
var getUser = function(req, res) {
  User.model.findOne({
    key: req.params.user,
  }).exec(function(err, item) {

    if (err) return res.err(err);
    if (!item) return res.notfound();

    res.json({
      data: item
    });

  });
}

/**
 * Create a User
 */
var addUser = function(req, res) {

  var item = new User.model();

  User.updateItem(item, req.body, function (err) {
    if (err) return res.err(err);
        res.json({
            data: User.getData(item)
        });
    });
}

/**
 * Update User by ID
 */
var updateUser = function(req, res) {

  User.model.findOne({
    key: req.params.user,
  }).exec(function(err, item) {

    if (err) return res.err(err);
    if (!item) return res.notfound();

    User.updateItem(item, req.body, function (err) {

      if (err) return res.err(err);

      res.json({
        data: User.getData(item)
      });

    });

  });
}

/**
 * Delete User by ID
 */
var removeUser = function(req, res) {
  User.model.findOne({
    key: req.params.user,
  }).exec(function (err, item) {

    if (err) return res.err(err);
    if (!item) return res.notfound();

    item.remove(function (err) {
      if (err) return res.json({ dberror: err });

      return res.json({
        success: true
      });
    });

  });
}


router.route('/')
.get(getAllUsers)
.post(addUser);

router.route('/:user')
.get(getUser)
.put(updateUser)
.delete(removeUser);

module.exports = router;