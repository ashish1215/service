var models  = require('../models');
var express = require('express');
var router  = express.Router();
var md5 = require('md5');

router.post('/create', function(req, res) {
  req.body['password'] = md5(req.body.password)
  models.User.create(req.body).then(function() {
    res.redirect('/');
  });
});

router.post('/authenticate', async function(req, res) {
  const password = md5(req.body.password)

  return models.User.findOne({where: { username: req.body.username, password: password}}).then((response) =>{
    if(response) {
      return res.json(response)
    } else {
      throw new Error
    }
  }).catch((error) => {
    return res.status(404).send("Invalid Credentials")
  })
  
})

router.post('/getValues', async function(req,res) {
  let data = req.body;
  let users = await models.User.findAll({
    include:[{
      model: models.Task
    }],
    where: {
      username: 'Ashish'
    } });
  console.log(users);
  let specificUser = await models.User.findAndCountAll({ where: { username: 'Ashish' }, limit: 5 });
  
  return res.json(specificUser);
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/tasks/:task_id/destroy', function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.redirect('/');
  });
});


module.exports = router;
