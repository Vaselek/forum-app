const mongoose = require('mongoose');
const config = require('./config');

const Post = require('./models/Post');
const Comment = require('./models/Comment');
const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();
    for (let collection of collections) {
        await collection.drop();
    }

    let users = await User.create(
        {username: 'John Doe', password: 'password', token: '123'},
        {username: 'Vano Ivan', password: 'password', token: '456'}    )

    let posts = await Post.create(
        {
            title: 'First Post',
            description: 'First description',
            user: users[0]._id,
            issuedAt: '2015-10-05T14:48:00.000',
            image: 'first-post.png'
        },
        {
            title: 'Second Post',
            description: 'Second description',
            user: users[0]._id,
            issuedAt: '2015-10-05T15:48:00.000',
            image: 'second-post.png'
        },
    )

    await Comment.create(
        {
            user: users[0]._id,
            post: posts[0]._id,
            text: 'First comment',
        },
        {
            user: users[0]._id,
            post: posts[1]._id,
            text: 'Second comment',
        },
        {
            user: users[1]._id,
            post: posts[1]._id,
            text: 'Third comment',
        }

    )

    await connection.close();
};

run().catch(error => {
    console.error('Smt went wrong', error);
});

