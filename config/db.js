const mongoose = require('mongoose');

const  config = require('config');

const db = config.get('mongoURI');

const connectDB = async()=>{
    try{
        await mongoose.connect(db,{
            userNewUrlParser:true,
            userCreateIndex:true,
            userUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('MongoDB Connected');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;