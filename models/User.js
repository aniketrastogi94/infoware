const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    orders:[
        {
            orderId:{
                type:Schema.Types.ObjectId,
                ref:'product',
            },
            price:{
                type:Number
            },
            name:{
                type:String
            },
            description:{
                type:String
            },
            image:{
                type:String
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model('user',userSchema);