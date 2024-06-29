const express=require('express');
const passport = require('passport');
const User = require('../Models/User');
const router=express.Router();


router.get('/', (req, res) => {
    res.render('auth/Signup');
});

router.post('/',async (req, res) => {
    try{
   let {email,password,username,role}= req.body;
  const user= new User({email,username,role})                
  const newUser= await User.register(user,password);    
    // res.send(newuser);
    // res.redirect('/login');    
    req.login(newUser,function(err){ 
        if(err){
            return next(err)
        }
        req.flash('success','welcome ');
        return res.redirect('/products');
    }) 
} 
  catch(err){
        req.flash('error',err.message);
        res.redirect('/');
  }            

});


router.get('/login', (req, res) => {
        res.render('auth/login');
})


router.post('/login',                         
passport.authenticate('local', { 
    failureRedirect: '/login', 
    failureMessage: true 
}),
 (req, res) => {      
    req.flash('success','Welcome back') ;
    res.redirect('/products');

});

// logout 
router.get('/logout',(req, res) => {
    ()=>{
        req.logout();
    }
    req.flash('success','goodbye friends,see you again');
    res.redirect('/login');
})


module.exports = router
