var models  = require('../models');
var express = require('express');
var router  = express.Router();
var md5 = require('md5');

router.post('/create', function(req, res) {
  models.Task.create(req.body).then(function() {
    res.json("success")
  });
});


router.put('/update', function(req, res) {
  let where = { id: req.body.id}
  models.Task.update(req.body, {where}).then(function() {
    res.json("success")
  }).catch((error) => {
    res.json(error)
  })
});


module.exports = router;
