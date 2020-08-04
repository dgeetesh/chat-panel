var express = require('express');
var router = express.Router();
const Usercontroller = require('../controller/users');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const passport = require('passport');
const auth = require('./auth');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Auth0 Routes

// Perform the login, after login Auth0 will redirect to callback
// router.get('/login', passport.authenticate('auth0', {
//   // scope: 'openid email profile'
// }), function (req, res) {
//   res.redirect('/');
// });


// Perform the final stage of authentication and redirect to previously requested URL or '/user'
// router.get('/callback', function (req, res, next) {
//   console.log('callback')
//   passport.authenticate('auth0',{session:false}, function (err, user, info) {
//     if (err) { 
//       console.log(err)
//       return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     // req.logIn(user, function (err) {
//     //   if (err) { return next(err); }
//     //   const returnTo = req.session.returnTo;
//     //   delete req.session.returnTo;
//     //   res.redirect(returnTo || '/user');
//     // });

//     console.log('user',user)
//     if(user) {
//       const users = user;
//       users.token = users.generateJWT();
//       return res.json({ user: users.toAuthJSON() });
//     }
    
//   })(req, res, next);
// });


//  JWT Auths


/* post users */

router.post('/signUp',auth.optional, function(req, res, next) {
  if(req.body.email && req.body.password && req.body.firstName){
    Usercontroller.getUsers(req).then(resp=>{
      if(resp){
         res.send({ successCode: false,statusCode:409,'message': 'This email already exsist' });
      }else{
       const encryptedString = cryptr.encrypt(req.body.password);
       var userData={
            'email':req.body.email,
            'password':encryptedString,
            'firstName':req.body.firstName,
            'lastName':req.body.lastName,
            'phoneNumber':req.body.number
           }
        Usercontroller.createUsers(userData).then(resp=>{
          res.send({ successCode:true,statusCode:200,'message': 'Account created succesfully','result':resp })
        })
        .catch(err=>{
          res.send({ successCode:false,statusCode:500, 'err':err,'message': 'SOmething goes wrong' })
         })
      }
    })    
  }else{
    console.log("enter")
    res.send({ successCode:false,'message': 'variables are empty' });

  }
});

router.post('/login', auth.optional, (req, res, next) => {
  // const { body: { user } } = req;
  const user = req.body;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    console.log('passportUser',passportUser)
    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }

    return status(400);
  })(req, res, next);
});

router.get('/list', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Usercontroller.getAllUsers()
    .then((users) => {
      console.log(users)
      if(!users) {
        return res.sendStatus(400);
      }
      return res.json({ 'result': users});
    });
});

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  console.log(id)
  return Usercontroller.getUserById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
