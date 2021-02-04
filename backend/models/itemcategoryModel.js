const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    catName:{
        type: String,
        required:true,
        unique:true,
    },
    parentId:{
        type:String
    }

},{timestamp:true})

const categories = mongoose.model('categories',catSchema);
module.exports = categories;