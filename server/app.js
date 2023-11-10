const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const Registeruser = require("./model");
const middleware = require('./middleware');

app.use(cors({origin:'*'}));//origin means from any kind of domain if we want to access the router we need this

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogusers", {
  useNewUrlParser: true,
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // Check if the username already exists in the database
  const existingUser = await Registeruser.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const user = new Registeruser({ email, password });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await Registeruser.findOne({ email });
    if (!exist) {
      return res.status(400).send("User not found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }

    const payload = {
      user: {
        id: exist.id,
      },
    };
    //return the tokens if there is any error while returning the token handling will be done
    jwt.sign(payload, "thisisasecret", (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("server Error");
  }
});

//this is protected route for every protected route we should send middleware
//with the help of the middleware we will be handling token ........ to handle this particular route we need to send token all these token handlers will done by middleware
//ee myblogs protected router ni neenu access chesukovali anukuntey neenu login chesinappudu generate ayina token , aa same token ni use chesi i am going to access this particular route
//In middleware only we are decoding the token which we got
app.get("/myblogs", middleware, async (req, res) => {
  try {
    //we will be checking that the object id that we got through middleware is there in the database or not
    //req.user.id is the user id that we got through middleware
    const exist = await Registeruser.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("user not found");
    }
    //exist contains the object in the form of user
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error"+err);
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
