const jwt = require('jsonwebtoken');
// const { JWT_SECRET} = require('../config/keys')
// const User = require('../models/userModel')

// exports.requiresignin = (req,res,next) => {
//     const {authorization} =req.headers

//     if(!authorization){
//         return res.status(401).json({error:"you must be logged in"})
//     }
//     const token = authorization.replace("Bearer ","")
//     jwt.verify(token,"secret",(err,payload)=>{
//         if(err){
//             return res.status(401).json({error:"you must be logged"})
//         }else{
//             const  {_id}= payload
//             User.findById(_id).then(userdata=>{
//             req.user= userdata
//         })}
        
//         next()
//     })
// }
exports.requiresignin=(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,"secret");
        req.user=user;
        
    }else
    {return res.status(400).json({ message:"authorization is required"})}
    next();
}

// exports.adminPermission =(req,res,next)=>{
//     if(req.user.role !== "admin"){ 
//         return res.status(400).json({message:"sorry only admin can"})}
//         next();
// }

