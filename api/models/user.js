const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  })

  userSchema.methods.matchPassword =  async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


const userModel = mongoose.model("User",userSchema)


module.exports = userModel