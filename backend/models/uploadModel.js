const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    ProductName:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true,
        trim:true
    },
    productsDateofPurchase:{
        type:String,
        required: true
    },
    ProductPictures :{type:String,required:true},
    // Category : {type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},

    CreatedBy : {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},

    updatedAt:Date
},{timestamps:true})


module.exports = mongoose.model('Product',productSchema)