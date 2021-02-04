const express = require('express');
const router = express.Router();
const UserUpload = require("../models/uploadModel");
// const User = require("../models/userModel");
// const shortid = require('shortid');
// const multer = require('multer');
// const path = require('path');
const {requiresignin,} = require('../middleware/authentication.js')

 
// const storage = multer.diskStorage({
//     destination :function(req,file,cb){
//         cb(null,path.join(path.dirname(__dirname),'uploads'))
//     },
//     filename:function (req,file,cb){
//         cb(null, shortid.generate() + '-'+file.originalname)
//     }
// })

// const upload = multer({ storage });


router.post("/create/product",requiresignin,(req,res)=>{
    const {title,description,pic,age} = req.body;
    if(!title || !description || !pic || !age){
        return res.status(422).json({error:"plese fill all the fields"})
    }


    const item = new UserUpload({
        title : req.body.title,
        description:req.body.description,
        // category,
        ProductPictures:pic,
        age:req.body.age,
        uploadedby:req.user,
        
    })
    item.save().then((error,product)=>{
        if(error) return res.status(400).json({message:error})
        if(product){
            return res.status(200).json({message:"sucessfully uploaded"})
        }

    }).catch(err=>{ return res.status(400).json({err})})
})


router.get('/products/list', (req, res)=>{ 
    UserUpload.find({}).sort('-createdAt').
    then((products)=>{
       res.status(200).json({products});
    }).catch(err=>{
        console.log(err)
    })

})

module.exports = router;