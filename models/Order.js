const mongoose = require('mongoose');
const Scehma = mongoose.Schema;

const orderSchema = new Schema({
    userid:{
        type:Scehma.Types.ObjectId,
        ref : 'user'
    },
    products:{
        type:Array,
        default:[]
    },
    price:{
        type:Number,
        default:0
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Order= mongoose.model('order',orderSchema);
module.exports = Order;