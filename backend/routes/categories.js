const express = require('express');
const Categories = require('../models/itemcategoryModel.js');
const {requiresignin} = require('../middleware/authentication.js')


const router = express.Router();


function categoryTitleList(cat,parentId=null){

    const catList =[];
    let categorylist;
    if(parentId==null){
        categorylist = cat.filter(category => category.parentId == undefined)
    }
    else{
        categorylist = cat.filter(category =>category.parentId == parentId)
    }

    for(let Category in categorylist){
        catList.push({
            _id:Category._id,
            catName:Category.catName,
            children:categoryTitleList(cat,Category._id)
        })
    }
}

router.post('/create/category',requiresignin,(req, res) => {
    const categoryObj = {
        catName:req.body.catName,
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const catgory = new Categories(categoryObj)
    catgory.save((err,data)=>{
        if(err) return res.status(400).json({err})
        if(data){
            return res.status(200).json({data})
        }
    });
})

router.get('/getcategory',(req,res)=>{
    Categories.find({}).exec((error,category)=>{
        if(error)return res.status(404).json({error});
        if(category){
            // const List = categoryTitleList(category);
            return res.status(200).json({category})
        }
    })
})




module.exports = router