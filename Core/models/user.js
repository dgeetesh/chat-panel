const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const userSchema=new Schema ({
    firstName:{type:String},
    lastName:{type:String},
    email:{ type: String},
    password: { type: String },
    token:{type :String},
    phoneNumber:{type:Number}
})
userSchema.methods.validatePassword = function(password) {
    const decryptedString = cryptr.decrypt(this.password);
    return decryptedString ===password;

  };
userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
  }
  userSchema.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      email: this.email,
      token: this.generateJWT(),
      firstName: this.firstName
    };
  }
mongoose.model('users', userSchema);