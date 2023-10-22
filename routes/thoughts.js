var express = require('express');
var router = express.Router();

const db = require('../models/index');

router.get('', function(req, res, next) {
  
  db.Thought.find().then( results => {
    res.json(results);
  });

});

router.get('/:id', function(req, res, next) {

  var id = req.params.id;
  
  db.Thought.findOne({_id: id}).then( result => {
    res.json(result);
  });

});

router.put('', function(req, res, next){

  var id = req.body.id;
  var thoughtText = req.body.thoughtText;
  var username = req.body.username;

  db.Thought.updateOne(
    {_id:id},
    {
        thoughtText:thoughtText, 
        username: username
    }
    ).then(result => {

        res.json(result);
  
    });

});

router.post('', function(req, res, next){

    var thoughtText = req.body.thoughtText;
    var username = req.body.username;

  var thought = new db.Thought(
    {
        thoughtText:thoughtText, 
        username: username
    }
    );

  thought.save().then(result => {

    var finalResult = {};

    finalResult.thought = result;

    db.User.findOne({_id: id}).then( result => {
    
        var user = result;
    
        user.thoughts.push({_id: finalResult.thought._id});
      
        user.save().then( result => {

            finalResult.userResult = result;

            res.json(finalResult);

        });
    
    });

  });

});

router.delete('', function(req, res, next){

  var id = req.body.id;

  var finalResult = {};

  db.Thought.findOne({ _id: id }).then( result => {

    var thought = result;

    db.User.findOne({username: thought.username}).then( result => {
    
        var user = result;
    
        user.thoughts.pull({_id: thought._id});
      
        user.save().then( result => {

            finalResult.userResult = result;

            db.Thought.deleteOne({ _id: thought._id }).then( result => {

                finalResult.thoughtResult = result;

                res.json(finalResult);

            });

        });
    
    }); 

  });

});

router.post('/:id/reactions', function(req, res, next) {

    var id = req.params.thoughtId;

    var reaction = {
        reactionBody: req.body.reactionBody,
        username : req.body.username
    }
  
    db.Thought.findOne({_id: id}).then( result => {

        var thought = result;

        thought.reactions.push(reaction);

        thought.save().then(result => {
            res.json(result);
        });

    });
  
  });

router.delete('/:thoughtId/reactions/:reactionId', function(req, res, next) {
  
    var thoughtId = req.params.thoughtId;
    var reactionId = req.params.reactionId;

    db.Thought.findOne({_id: thoughtId}).then( result => {

        var thought = result;

        thought.reactions.pull({_id: reactionId});

        thought.save().then(result => {
            res.json(result);
        });

    });
  
});


module.exports = router;
