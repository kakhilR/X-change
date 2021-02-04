const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const { JWT_SECRET} = require('../config/keys.js')
const bcrypt = require('bcryptjs');


router.post('/signup',(req, res)=>{
    const {name,email,password} = req.body

    if(!email || !name || !password){
        return res.status(400).json({error:"please fill the fields"})
    }

    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,10).then(hash_password=>{
            const user = new User({
                email,
                password:hash_password,
                name,
                username: Math.random().toString(),
            })
                user.save().then(user=>{
                    res.status(200).json({message:"user sucessful saved"})
                }).catch(err=>{console.log(err)})
        })
    }).catch(err=>{console.log(err)})
})

router.post('/signin',(req,res)=>{
    const {email,password}= req.body
    if(!email || !password){
        return res.status(422).json({message:"please enter a valid email or password"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({message:'invalid email or password'})
        }
        bcrypt.compare(password,savedUser.password).then((doMatch)=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser.id},JWT_SECRET)
                const {_id,name,email} = savedUser
                res.json({
                    token,
                    user:{_id,name,email}
                })
                
            }
            else{
                return res.status(422).json({message:'invalid email or password'})
            }
        })
    }).catch(err =>{console.log(err)})
})
module.exports = router