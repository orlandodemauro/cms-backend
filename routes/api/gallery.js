var keystone = require('keystone');
var router = require('express').Router();

var Gallery = keystone.list('Gallery');

/**
 * List of Gallery models
 */
var getAllGalleries = function(req, res) {
  Gallery.model.find(function(err, items) {

    if (err) return res.err(err);

    res.json({
      data: items
    });

  });
}

/**
 * Get Gallery by ID
 */
var getGallery = function(req, res) {
  Gallery.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.err(err);
    if (!item) return res.notfound();

    res.json({
      data: item
    });

  });
}

/**
 * Create a Gallery
 */
var addGallery = function(req, res) {

  var item = new Gallery.model();

  Gallery.updateItem(item, req.body, function (err) {
    if (err) return res.err(err);
        res.json({
            data: Gallery.getData(item)
        });
    });
}

/**
 * Update Gallery by ID
 */
var updateGallery = function(req, res) {

  Gallery.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.err(err);
    if (!item) return res.notfound();

    Gallery.updateItem(item, req.body, function (err) {

      if (err) return res.err(err);

      res.json({
        data: Gallery.getData(item)
      });

    });

  });
}

/**
 * Delete Gallery by ID
 */
var removeGallery = function(req, res) {
  Gallery.model.findById(req.params.id).exec(function (err, item) {

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
.get(getAllGalleries)
.post(addGallery);

router.route('/:id')
.get(getGallery)
.put(updateGallery)
.delete(removeGallery);

module.exports = router;