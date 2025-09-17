const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:Number,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
})

module.exports = mongoose.model('Product',productSchema);