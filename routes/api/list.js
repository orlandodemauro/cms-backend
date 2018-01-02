var keystone = require('keystone');
var async = require('async');
var router = require('express').Router();


/**
 * List of PostCategory models
 */
var getAllBlogs = function(req, res) {

  keystone.list('PostCategory').model.find().sort("name").exec(function(err, items) {
    var result = [];
    if (err) return res.err(err);
		// Load the counts for each category
		async.eachSeries(items, function (category, next) {

      keystone.list('Post').model
      .count()
      .where('categories')
      .in([category.id])
      .where('state', req.query.state || 'published')
      .exec(function (err, count) {
        result.push(Object.assign({ "postCount": count }, JSON.parse(JSON.stringify(category))));
				next(err);
			});
		}, function (err) {
      if (err) return res.err(err);

      res.json({
        data: result
      });
		});

  });
}

router.route('/blog')
.get(getAllBlogs)


module.exports = router;