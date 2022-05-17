const User = require("../models/User");
const LocalStrategy = require('passport-local').Strategy;
const jsonwebtoken = require("jsonwebtoken");
const {
  InternalServerErrorResponse,
  UnauthorizedResponse,
  BadRequestResponse,
  OkResponse,
} = require("express-http-response");

// const isToken = function (req, res, next) {
//   var token = req.headers.authorization.split(" ");
//   if (typeof token[1] === "undefined" || typeof token[1] === null) {
//     throw new UnauthorizedResponse(
//       "Please login first to continue further!",
//       403
//     );
//   } else {
//     jsonwebtoken.verify(token[1], "shhhhh", (err, data) => {
//       if (err) {
//         throw new UnauthorizedResponse(
//           "Please login first to continue further!",
//           403
//         );
//       } else {
//         req.user = data;
//         next();
//       }
//     });
//   }
// };

const isEmail = function (req, res, next) {
    console.log('middleware check')
  User.count({ $and: [{ email: req.body.email }] }, (err, count) => {
    if (err) {
      next(new InternalServerErrorResponse());
    } else if (count > 0) {
        console.log('count')
      next(new BadRequestResponse({message:"Email already exist!"}, 422.0));
    } else {
      next();
    }
  });
};
const localStrategy = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {    
    User.findOne({email: email}, (err, user) => {
            if(err) return done(err)
            if(!user){
                return done(null, false, {message: 'Incorrect Email Address'})
            }
            if(!user.validPassword(password)){
                return done(null, false, {message: 'Incorrect Password'})
            }
            return done(null, user)
        })
    }
)

module.exports = { isEmail,localStrategy};
