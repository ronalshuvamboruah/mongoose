const blogSchema=require("../Models/blogSchema");

const postBlogs=async(req,res)=>{
    const blog=new blogSchema(req.body);
    try{
        blog.save();
        console.log("it is saved");
        res.send(blog)
    }catch(err){
        res.send(err)
    }
}

module.exports=postBlogs