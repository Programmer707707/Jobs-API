const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');

const register = async(req,res) => {
    const user = await User.create({...req.body}) // schema orqali user kiritgan info validate bo'ladi
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: {name: user.name }, token})
}

const login = async(req,res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError("Please provide your email and password");
    }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('invalid credentials');
    }

    const isPswdCorrect = await user.comparePassword(password);
    if(!isPswdCorrect){
        throw new UnauthenticatedError('Invalid password');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {register, login}