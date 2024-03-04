const express = require("express");
const connectDB = require("./db");
const Post = require("./models/postModel");
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");

//Init app & middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect db
connectDB();

//routes
app.get('/M00908746/posts', async (req, res)=>{
  const posts = await Post.find()
  res.status(200).json(posts)
})

// register user
app.post('/M00908746/register', async (req, res)=>{
  const {username, email, fullname, password} = req.body
  
  if(!username || !email || !fullname || !password){
      res.status(400)
      throw new Error(`Please body can't be empty`)
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashed_password = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
      username,
      fullname,
      email,
      password: hashed_password
  })

    res.status(201).json({
        _id: user.id,
        userid: user.username,
        fullname: user.fullname
    })
})


// user post content
app.post('/M00908746', async (req, res)=>{
  const {author, title, content} = req.body
  
  if(!title || !content){
      res.status(400)
      throw new Error(`Please title and author can't be empty.`)
  }

  // create post
  const post = await Post.create({
      author,
      title,
      content
  })

    res.status(201).json({
        _id: post.id,
        title: post.title,
        content : post.content
    })
})


// edit post
app.put('/M00908746/update/post/:id', async (req, res)=>{
  const post = await  Post.findById(req.params.id)

  if(!post){
      res.status(400)
      throw new Error(`Post not found`)
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
  })
  
  res.status(200).json(updatedPost)
})


app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
