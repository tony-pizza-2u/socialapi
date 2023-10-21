var express = require('express');
var router = express.Router();

const db = require('../models/index');

/* GET users listing. */
router.get('*', function(req, res, next) {
  
  db.User.find().then( results => {
    res.json(results);
  });

});

router.put('*', function(req, res, next){

  var id = req.body.id;
  var username = req.body.username;
  var email = req.body.email;

  db.User.updateOne(
    {_id:id},
    {username:username, email: email}
    ).then(result => {
      res.json(result);
    });

});

router.post('*', function(req, res, next){

  var username = req.body.username;
  var email = req.body.email;

  var user = new db.User({username: username, email: email});

  user.save().then(result => {

    res.json(result);

  });



});

module.exports = router;
