const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'Token not provided'});
    }
    console.log('---------------')
    console.log(token)
    const user = await User.findOne({token})
    if (!user) {
        return res.status(401).send({error: 'User not provided'});
    }
    req.user = user;
    next();
};

module.exports = auth;