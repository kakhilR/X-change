const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },

})

const User = mongoose.model('User',Userschema)
module.exports = User;