var express = require('express');
var router = express.Router();

const db = require('../models/index');

router.get('', function (req, res, next) {

    try {

        db.Thought.find().then((error) => { return next(error) }, results => {
            res.json(results);
        });

    } catch (error) {
        return next(error);
    }

});

router.get('/:id', function (req, res, next) {

    try {

        var id = req.params.id;

        db.Thought.findOne({ _id: id }).then((error) => { return next(error) }, result => {
            res.json(result);
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
        ).then((error) => { return next(error) }, result => {

            res.json(result);

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

        thought.save().then((error) => { return next(error) }, result => {

            var finalResult = {};

            finalResult.thought = result;

            db.User.findOne({ _id: id }).then((error) => { return next(error) }, result => {

                var user = result;

                user.thoughts.push({ _id: finalResult.thought._id });

                user.save().then((error) => { return next(error) }, result => {

                    finalResult.userResult = result;

                    res.json(finalResult);

                });

            });

        });

    } catch (error) {
        return next(error);
    }

});

router.delete('/:id', function (req, res, next) {

    try{

        var id = req.params.id;

        var finalResult = {};
    
        db.Thought.findOne({ _id: id }).then((error) => { return next(error) }, result => {
    
            var thought = result;
    
            db.User.findOne({ username: thought.username }).then((error) => { return next(error) }, result => {
    
                var user = result;
    
                user.thoughts.pull({ _id: thought._id });
    
                user.save().then((error) => { return next(error) }, result => {
    
                    finalResult.userResult = result;
    
                    db.Thought.deleteOne({ _id: thought._id }).then((error) => { return next(error) }, result => {
    
                        finalResult.thoughtResult = result;
    
                        res.json(finalResult);
    
                    });
    
                });
    
            });
    
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
    
        db.Thought.findOne({ _id: id }).then((error) => { return next(error) }, result => {
    
            var thought = result;
    
            thought.reactions.push(reaction);
    
            thought.save().then((error) => { return next(error) }, result => {
                res.json(result);
            });
    
        });

    }catch(error){
        return next(error);
    }

});

router.delete('/:thoughtId/reactions/:reactionId', function (req, res, next) {

    try{

        var thoughtId = req.params.thoughtId;
        var reactionId = req.params.reactionId;
    
        db.Thought.findOne({ _id: thoughtId }).then((error) => { return next(error) }, result => {
    
            var thought = result;
    
            thought.reactions.pull({ reactionId: reactionId });
    
            thought.save().then((error) => { return next(error) }, result => {
                res.json(result);
            });
    
        });        

    }catch(error){
        return next(error);
    }

});


module.exports = router;
