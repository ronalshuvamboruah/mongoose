var express=require('express');
var BlogRouter=express.Router();
// const userModel=require("../Models/models")
// const {postUsers,getUsers}=require("../Controllers/userController")
const {postBlogs}=require("../Controllers/blogController.js")
//router

BlogRouter.post("/bloggers", postBlogs)


  module.exports=BlogRouter