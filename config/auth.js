const jwt=require('jsonwebtoken');
const users=require('../models/users');
const asyncHandler=require('express-async-handler');



const auth = asyncHandler(async (req, res, next) => {
    let token;
    //console.log(req.headers);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1]
        //console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded);
        req.user = await users.findById(decoded.id).select('-password');
        if(req.user){
          next();
        }else{
          return res.status(403).json({
            status:'failure',
            message:'you are trying to access things that does not come into your type,please specify your type first',
            data:{
              token:null
            }
          });
        }
      } catch (error) {
        //console.log(error);
        return res.status(401).json({
          status:'Failure',
          message:'You are not authorized,please login again',
          data:{
            token:null
          }
        });
      }
    }
  
    if (!token) {
      return res.status(401).json({
        status:'Failure',
          message:'You are not authorized,please login again',
          data:{
            token:null
          }
      });
    }
  })
module.exports=auth;