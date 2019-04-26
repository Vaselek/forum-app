const express = require('express');
const auth = require('../middleware/auth')

const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.post)
        return Comment.find({post: new ObjectId(req.query.post)}).sort([['issuedAt', 1]])
            .then(comments => res.send(comments))
            .catch(() => res.sendStatus(500));
    Comment.find()
        .then(comments => res.send(comments))
        .catch(() => res.sendStatus(500));
});

router.post('/', auth, (req, res) => {
    const commentData = req.body;

    const comment = new Comment(commentData);

    comment.save()
        .then(result => res.send(result))
        .catch((error) => res.sendStatus(400).send(error));

});

module.exports = router;
