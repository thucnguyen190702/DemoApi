const bcrypt = require('bcrypt');
const User = require('../models/admin.model');

exports.postReg = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const user = new User(req.body);
        console.log(req.body);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        if (!user){
            return res.status(401).send({error:"Login faild! Check authentication credentials"})
        }
        const  token = await user.generateAuthToken();
        res.status(200).send({user,token});
    }catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
exports.postProfile = (req, res, next) => {

}
exports.postLogout = (req, res, next) => {

}

