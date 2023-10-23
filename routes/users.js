var express = require('express');
var router = express.Router();

const db = require('../models/index');

function handleErrors(handleErrors, error){
  throw(error);
}

router.get('', function(req, res, next) {
  
  db.User.find().then(handleErrors, results => {
    res.json(results);
  },);

});

router.get('/:id', function(req, res, next) {

  try{

    var id = req.params.id;
  
    db.User.findOne({_id: id}).then(handleErrors, result => {
      res.json(result);
    });

  }catch(error){
    return next(error);
  }

});

router.post('', function(req, res, next){

  try{

    var username = req.body.username;
    var email = req.body.email;

    var user = new db.User({username: username, email: email});

    user.save().then(handleErrors, result => {
  
        res.json(result);
    
    });

  } catch(error){
    return next(error);
  }

});

router.put('', function(req, res, next){

  try{

    var id = req.body.id;
    var username = req.body.username;
    var email = req.body.email;
  
    db.User.updateOne(
      {_id:id},
      {username:username, email: email}
      ).then(handleErrors, result => {
  
        res.json(result);
  
      });

  } catch(error){
    return next(error);
  }

});

router.delete('/:id', function(req, res, next){

  try{

    var id = req.params.id;

    db.User.deleteOne({ _id: id }).then(handleErrors, result => {
      res.json(result);
    });

  } catch(error){
    return next(error);
  }

});

router.post('/:id/friends/:friendId', function(req, res, next){


  try{

    var id = req.params.id;
    var friendId = req.params.friendId;
  
    db.User.findOne({_id: id}).then(handleErrors, result => {
      
      var user = result;
  
      user.friends.push({_id: friendId});
    
      user.save().then(handleErrors, result => {
          res.json(result);
      });
    
    });

  } catch(error){
    return next(error);
  }

});

router.delete('/:id/friends/:friendId', function(req, res, next){

  try{

    var id = req.params.id;
    var friendId = req.params.friendId;
  
    db.User.findOne({_id: id}).then(handleErrors, result => {
      
      var user = result;
  
      user.friends.pull({_id: friendId});
  
      user.save().then(handleErrors, result => {
          res.json(result);
      });
  
    });

  } catch(error){
    return next(error);
  }

});


module.exports = router;
