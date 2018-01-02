var keystone = require('keystone');
var router = require('express').Router();

var Enquiry = keystone.list('Enquiry');

var create = function (req, res) {
    var item = new Enquiry.model();

    Enquiry.updateItem(item, req.body, {
      flashErrors: true,
      fields: 'name, email, phone, enquiryType, message',
      errorMessage: 'There was a problem submitting your enquiry:'
    }, function (err) {
      if (err) return res.err(err);

      res.json({
        data: Enquiry.getData(item)
      });
   });
}


router.route('/')
.post(create);

module.exports = router;