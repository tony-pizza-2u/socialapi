var express = require('express');
var router = express.Router();

const db = require('../models/index');

router.get('', function (req, res, next) {

    try {

        db.Thought.find().then((results) => {
            res.json(results);
        }).catch(function(err){
            return next(err);
        });

    } catch (error) {
        return next(error);
    }

});

router.get('/:id', function (req, res, next) {

    try {

        var id = req.params.id;

        db.Thought.findOne({ _id: id }).then((result) => {
            res.json(result);
        }).catch(function(err){
            return next(err);
        });

    } catch (error) {
        return next(error);
    }

});

router.put('/:id', function (req, res, next) {

    try {

        var id = req.params.id;
        var thoughtText = req.body.thoughtText;

        db.Thought.updateOne(
            { _id: id },
            {
                thoughtText: thoughtText
            }
        ).then((result) => {

            res.json(result);

        }).catch(function(err){
            return next(err);
        });

    } catch (error) {
        return next(error);
    }

});

router.post('', function (req, res, next) {

    try {

        var thoughtText = req.body.thoughtText;
        var username = req.body.username;
        var id = req.body.id;

        var thought = new db.Thought(
            {
                thoughtText: thoughtText,
                username: username
            });

        thought.save().then((result) => {

            var finalResult = {};

            finalResult.thought = result;

            db.User.findOne({ _id: id }).then((result) => {

                var user = result;

                user.thoughts.push({ _id: finalResult.thought._id });

                user.save().then((result) => {

                    finalResult.userResult = result;

                    res.json(finalResult);

                }).catch(function(err){
                    return next(err);
                });

            }).catch(function(err){
                return next(err);
            });

        }).catch(function(err){
            return next(err);
        });

    } catch (error) {
        return next(error);
    }

});

router.delete('/:id', function (req, res, next) {

    try{

        var id = req.params.id;

        var finalResult = {};
    
        db.Thought.findOne({ _id: id }).then((result) => {
    
            var thought = result;
    
            db.User.findOne({ username: thought.username }).then((result) => {
    
                var user = result;

                if(user && user.thoughts){

                    user.thoughts.pull({ _id: thought._id });
    
                    user.save().then((result) => {
        
                        finalResult.userResult = result;
        
                        db.Thought.deleteOne({ _id: thought._id }).then((result) => {
        
                            finalResult.thoughtResult = result;
        
                            res.json(finalResult);
        
                        }).catch(function(err){
                            return next(err);
                        });
        
                    }).catch(function(err){
                        return next(err);
                    });

                } else {

                    db.Thought.deleteOne({ _id: thought._id }).then((result) => {
        
                        finalResult.thoughtResult = result;
    
                        res.json(finalResult);
    
                    }).catch(function(err){
                        return next(err);
                    });

                }
    
            }).catch(function(err){
                return next(err);
            });
    
        }).catch(function(err){
            return next(err);
        });
    
    }catch(error){
        return next(error);
    }

});

router.post('/:id/reactions', function (req, res, next) {

    try{

        var id = req.params.id;

        var reaction = {
            reactionId: new db.mongoose.Types.ObjectId(),
            reactionBody: req.body.reactionBody,
            username: req.body.username
        }
    
        db.Thought.findOne({ _id: id }).then((result) => {
    
            var thought = result;
    
            thought.reactions.push(reaction);
    
            thought.save().then((result) => {
                
                res.json(result);

            }).catch(function(err){
                return next(err);
            });
    
        }).catch(function(err){
            return next(err);
        });

    }catch(error){
        return next(error);
    }

});

router.delete('/:thoughtId/reactions/:reactionId', function (req, res, next) {

    try{

        var thoughtId = req.params.thoughtId;
        var reactionId = req.params.reactionId;
    
        db.Thought.findOne({ _id: thoughtId }).then((result) => {
    
            var thought = result;

            if(thought.reactions){

                thought.reactions.pull({ reactionId: reactionId });
    
                thought.save().then((result) => {
    
                    res.json(result);
    
                }).catch(function(err){
                    return next(err);
                });
                
            } else {

                res.json(thought);
                
            }
    
        }).catch(function(err){
            return next(err);
        });        

    }catch(error){
        return next(error);
    }

});

module.exports = router;
