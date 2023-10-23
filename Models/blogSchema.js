const mongoose =require('mongoose');
const {Schema}=mongoose;

const blogSchema=new Schema({
    title:"String",
    author:"String",
    body:"String",
    comments:"String",
    meta:{
        votes:Number,
        favs:Number
    }
})
const blog=mongoose.model("Blog",blogSchema);

module.exports=blog;