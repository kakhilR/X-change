const express = require('express');
const router = express.Router();
const Product = require('../models/uploadModel.js')
const {requiresignin,} = require('../middleware/authentication.js')
// const shortid = require('shortid');
// const multer = require('multer');
// // const upload = multer({dest:'uploads/'});
// const path = require('path');



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
    // res.status(200).json({file:req.files,body:req.body});
    const {ProductName,description,productsDateofPurchase,Pictures} = req.body;
    console.log(ProductName,description,productsDateofPurchase,Pictures)
    if(!ProductName || !description || !productsDateofPurchase || !Pictures){
        return res.status(422).json({error:"please enter all the fileds"})
    }
 
    // let ProductPictures = [];

    // if(req.files.length > 0){
    //     ProductPictures = req.files.map(file =>{ 
    //         return { img :file.filename }
    //     })
    // }
    // ProductPictures

    const product = new Product({
        ProductName : req.body.ProductName,
        description:req.body.description,
        // Category,
        CreatedBy:req.user._id,
        productsDateofPurchase:req.body.productsDateofPurchase,
        ProductPictures:Pictures,
    })
    product.save().then((error,product)=>{
        if(error) return res.status(400).json({message:error})
        if(product){
            return res.status(200).json({product})
        }

    }).catch(error=>{ return res.status(400).json({error})})
})


router.get('/products/list', (req, res)=>{ 
    Product.find({}).sort('-createdAt')
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })

})



module.exports = router;