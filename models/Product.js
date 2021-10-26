const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
 
const Product = mongoose.model('product',productSchema);
module.exports =Product;