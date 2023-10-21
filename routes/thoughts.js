var express = require('express');
var router = express.Router();

const db = require('../models/index');

/* GET thoughts listing. */
router.get('*', function(req, res, next) {
  
  db.Thought.find().then( results => {
    res.json(results);
  });

});

router.get('/:id', function(req, res, next) {

  var id = req.params.id;
  
  db.Thought.find({_id: id}).then( results => {
    res.json(results);
  });

});

router.put('*', function(req, res, next){

  var id = req.body.id;
  var thoughtText = req.body.thoughtText;
  var username = req.body.username;
  var reactions = req.body.reactions;

  db.Thought.updateOne(
    {_id:id},
    {
        thoughtText:thoughtText, 
        username: username,
        reactions: reactions
    }
    ).then(result => {
      res.json(result);
    });

});

router.post('*', function(req, res, next){

    var thoughtText = req.body.thoughtText;
    var username = req.body.username;
    var reactions = req.body.reactions;

  var thought = new db.Thought(
    {
        thoughtText:thoughtText, 
        username: username,
        reactions: reactions
    }
    );

  user.save().then(result => {

    res.json(result);

  });

});

router.delete('*', function(req, res, next){

  var id = req.body.id;

  db.Thought.deleteOne({ id: id }).then( result => {
    res.json(result);
  });

});

module.exports = router;
