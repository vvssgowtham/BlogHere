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
app.post('/signupform',async (req,res) => {

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

app.listen(5000);