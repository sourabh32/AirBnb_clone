const asyncHandler = require("express-async-handler");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await userModel.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await userModel.create({
      name,
      email,
      password,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });


const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
  const user = await userModel.findOne({email})
  console.log(user)
  if(user && user.matchPassword(password)){
     jwt.sign({email:user.email,name:user.name,id:user._id},process.env.SECRET,{},(err,token)=>{
      if (err) throw new Error(err)
      res.cookie('token',token).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });

    })
  }
  else {
    res.status(401);
    throw new Error('Invalid email or password');
  }


})


const getProfile = asyncHandler(async(req,res)=>{
const {token} = req.cookies
console.log(token)
if(token){
     jwt.verify(token,process.env.SECRET,{},(err,user)=>{
        if (err) throw new Error(err)
        res.json(user)
    })
}
else{
    res.json(null)
}



})


exports.authUser = authUser
exports.registerUser =registerUser
exports.getProfile =getProfile
  