const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  password:{
    type:String,
    required:true
  },
  accessToken:{
    type:String,
    required:false
  },
  refreshToken:{
    type:String,
    required:false
  }
},{
  timestamps:true
});

const userUser = mongoose.model("User", UserSchema);

module.exports = userUser;