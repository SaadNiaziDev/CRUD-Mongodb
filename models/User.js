const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");


const UserSchema = mongoose.Schema({
    email:{type:String},
    salt:{type:String},
    hash:{type:String},
    token:{type:String}
})

UserSchema.methods.validPassword = function (password) {
    var hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.hash === hash;
  };
  
  UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
  };

  UserSchema.methods.generateJWT = function () {
    return jwt.sign(
      { id: this._id, email: this.email },
      "shhhh",
      {
        expiresIn: "72h",
      }
    );
  };
  
  UserSchema.methods.toAuthJSON = function () {
    return {
      email: this.email,
      token: this.generateJWT(),
    };
  };
  
  UserSchema.methods.toJSON = function () {
    return {
      email: this.email,
    };
  };
  

const User= mongoose.model('User',UserSchema);
module.exports = User;