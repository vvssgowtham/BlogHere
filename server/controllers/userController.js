const Registeruser = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await Registeruser.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Username already taken" });
  }

  const user = new Registeruser({ email, password });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
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
    jwt.sign(payload, process.env.secretkey, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Server Error");
  }
};

module.exports = {
  signUp,
  login
};
