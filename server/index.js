require('dotenv').config();//here we are not assigning any variables because we want to use it continuously keep it at top only.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());//Enable CORS


//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/usersDataBase',{useNewUrlParser : true});

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});

//creating model
const User = new mongoose.model("User",userSchema);

//your route definition
app.post('/api/signup',async (req,res) => {

    const { email, password } = req.body;
    // Check if the username already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  const user = new User({email, password});
  try {
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRETKEY);

  res.json({ user :  token });
});


app.get('/api/createblog', async (req, res) => {
  const token = req.headers['x-access-token'];
  try{
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({status: 'ok'})
  }catch(error){
    console.log(error);
    res.json({status : 'error',error : 'invalidtoken'})
  }
});

app.listen(5000);