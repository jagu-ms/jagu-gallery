const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../modules/user');

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    
    User.findOne({email})
    .then(user => {
        if(!user || !user.checkPassword(password)){
            throw createError(401, 'please check your email and password');
        }
        res.json(user.signJwt());
    })
    .catch(next); 
};

exports.signup = (req, res , next) => {
  let data = { name , email, password } = req.body;
    User.findOne({email})
    .then(user => {
        if(user) throw createError(422, 'this username is already exist');
        return User.create(data);
    })
    .then(user => {
        res.json(user.signJwt());
    })
    .catch(next);
}