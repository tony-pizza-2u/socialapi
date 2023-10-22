var express = require('express');
var router = express.Router();

const db = require('../models/index');

router.get('', function(req, res, next) {
  
  db.User.find().then( results => {
    res.json(results);
  });

});

router.get('/:id', function(req, res, next) {

  var id = req.params.id;
  
  db.User.findOne({_id: id}).then( result => {
    res.json(result);
  });

});

router.post('', function(req, res, next){

  var username = req.body.username;
  var email = req.body.email;

  var user = new db.User({username: username, email: email});

  user.save().then(result => {

    res.json(result);

  });

});

router.put('', function(req, res, next){

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

router.delete('/:id', function(req, res, next){

  var id = req.params.id;

  db.User.deleteOne({ _id: id }).then( result => {
    res.json(result);
  });

});

router.post('/:id/friends/:friendId', function(req, res, next){

  var id = req.params.id;
  var friendId = req.params.friendId;

  db.User.findOne({_id: id}).then( result => {
    
    var user = result;

    user.friends.push({_id: friendId});
  
    user.save().then( result => {
        res.json(result);
    });
  
  });

});

router.delete('/:id/friends/:friendId', function(req, res, next){

  var id = req.params.id;
  var friendId = req.params.friendId;

  db.User.findOne({_id: id}).then( result => {
    
    var user = result;

    user.friends.pull({_id: friendId});

    user.save().then( result => {
        res.json(result);
    });

  });

});


module.exports = router;
