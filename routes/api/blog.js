var keystone = require('keystone');
var async = require('async');
var router = require('express').Router();

var PostCategory = keystone.list('PostCategory');

/**
 * Create a PostCategory
 */
var addPostCategory = function(req, res) {

  var item = new PostCategory.model();

  PostCategory.updateItem(item, req.body, function (err) {
    if (err) return res.err(err);
        res.json({
            data: PostCategory.getData(item)
        });
    });
}

/**
 * Update PostCategory by ID
 */
var updatePostCategory = function(req, res) {

  PostCategory.model.findOne({
    key: req.params.category,
  }).exec(function(err, item) {

    if (err) return res.err(err);
    if (!item) return res.notfound();

    PostCategory.updateItem(item, req.body, function (err) {

      if (err) return res.err(err);

      res.json({
        data: PostCategory.getData(item)
      });

    });

  });
}

/**
 * Delete PostCategory by ID
 */
var removePostCategory = function(req, res) {
  PostCategory.model.PostCategory.model.findOne({
    key: req.params.category,
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

/**
 * List of Posts by Category key
 */
var getPostsByCategory = function(req, res) {
  PostCategory.model.findOne({
    key: req.params.category,
  }).exec(function (err, category) {
    if (err) return res.err(err);
    if (!category) return res.notfound();
    keystone.list('Post').paginate({
      page: req.query.page || 1,
      perPage: 10,
      maxPages: 10
    })
    .where('categories').in([category.id])
    .where('state', req.query.state || 'published')
    .sort('-publishedDate')
    .populate('author categories')
    .exec(function(err, results) {
      if (err) return res.err(err);
      res.json({
        data: results
      });
    });
  });
}

/**
 * List of Post models
 */
var getAllPosts = function(req, res) {
  keystone.list('Post').paginate({
    page: req.query.page || 1,
    perPage: 10,
    maxPages: 10
  })
  .where('state', req.query.state || 'published')
  .sort('-publishedDate')
  .populate('author categories')
  .exec(function(err, items) {

    if (err) return res.err(err);

    res.json({
      data: items
    });

  });
}

router.route('/')
.get(getAllPosts)
.post(addPostCategory);

router.route('/:category')
.get(getPostsByCategory)
.put(updatePostCategory)
.delete(removePostCategory);

module.exports = router;