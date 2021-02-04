const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const UploadSchema = new mongoose.Schema({
    ProductPictures:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        maxlength:300,
    },
    age:{
        type:String,
        required:true,
    },
    // exchangetype:{
    //     type:String,
    //     enum:['product-product','product-money','all'],
    //     default:'all'
    // },
    // category:{type:mongoose.Schema.Types.ObjectId,ref:'Categories',required:true},
    uploadedby:{type:ObjectId,ref:'User',},
},{timestamp:true})

const UserUpload = mongoose.model('UserUpload',UploadSchema)
module.exports = UserUpload;



 // "category":"6014459422d8f02caca0ec27",
        // "uploadedby":"6014276f20244b2c0c79cbf5",