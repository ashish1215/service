var models  = require('../models');
var express = require('express');
var router  = express.Router();
var md5 = require('md5');

router.post('/create', function(req, res) {
  models.Task.create(req.body).then(function() {
    res.json("success")
  });
});


module.exports = router;
