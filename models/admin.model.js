const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoapi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const hiddenString = process.env.TOKEN_SEC_KEY;
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username:'String',
    password:'String',
    email:'String',
    tokens:[{
        token:{
            type:String,
            require:true,
        }
    }]
},{collection:'account'});
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id},hiddenString);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
userSchema.statics.findByCredentials = async (username,password)=>{
    const user = await User.findOne({username});
    if (!user){
        throw new Error({error:'Invalid login credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if (!isPasswordMatch){
        throw new Error({error:'Invalid login credentials'})
    }
    return user;
}
const User = mongoose.model('User',userSchema);
module.exports = User;