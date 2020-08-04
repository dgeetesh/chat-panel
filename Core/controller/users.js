const User = require('../models/user.js');
const mongoose = require('mongoose');
const Users = mongoose.model('users');


class UserController {
    getAllUsers(){
       return Users.find().then(resp=>{
            return resp;
        })
    }
    getUsers(req){
       return Users.findOne({ email:req.body.email, }).then(res=>{
           return res;
       })
    }
    getUserById(id){
        console.log("id:",id)
      return Users.findById({_id: id}).then(res=>{
          console.log(res)
        return res;
     })
    }
    createUsers(req){
      return  Users.create(req);
    }
}
module.exports = new UserController();