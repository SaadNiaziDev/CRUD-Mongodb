const express = require('express')
var router = express.Router();
const {isEmail,localStrategy} = require('./../auth')
const User = require('../../models/User');
const passport = require("passport");
const {
    InternalServerErrorResponse,
    UnauthorizedResponse,
    BadRequestResponse,
    OkResponse,
  } = require("express-http-response");

router.post('/add',isEmail,(req, res,next)=>{
    try {
        let newUser = new User({
        email : req.body.email.toLowerCase()});
        newUser.setPassword(req.body.password)
        newUser.save().then((result) => {
          if (!result) {
              next(new BadRequestResponse("Fail to create new user"));
          } else {
            next(new OkResponse(result.toAuthJSON()));
          }
        });
      } catch (err) {
        console.log(err);
        next(new BadRequestResponse("Email Already exist"));
    }
});

router.post('/login',function(req, res,next) {
    try {
        User.findOne({email:req.body.email},(err, data)=>{
            if(!err && data){
                if(data.validPassword(req.body.password)){
                    res.send(data.toAuthJSON());
                }else{
                    res.send("Password is invalid")
                }
                //next(new OkResponse(data.toAuthJSON()));
            }else if(err){
                next(new BadRequestResponse("Fail to Login"));
            }
        })
    } catch (error) {
        next(new BadRequestResponse("Something bad happened!"));
    }
})

router.get('/',(req, res)=>{
    res.send("API got hiiy")
})

module.exports = router;