const express = require("express");
const app = express();
const validator = require("validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("./UserSchema");

const { validate } = require("./utilites/AuthUtils");

app.set("view engine", "ejs");

const mongoURL = `mongodb+srv://Viraj:Apriliasr150@cluster0.4tczojb.mongodb.net/auth-node`;
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Failed", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//method, end point, handler
app.get("/", (req, res) => {
  res.send("Welecome to the app");
});

app.get("/login", (req, res) => {
  return res.render("login");
});

app.get("/register", (req, res) => {
  return res.render("register");
});
app.post("/login", (req, res) => {
  return res.send("login");
});

// check for correct input

app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, username, password } = req.body;
  try {
    await validate({ name, email, username, password }).then();
  } catch (err) {
    return res.send({
      status: 400,
      message: err,
    });
  }

  // password hashing
  const hashed = await bcrypt.hash(password, 6);
  console.log(hashed);

  // insert the user data
  let user = new userSchema({
    name: name,
    username: username,
    password: hashed,
    email: email,
  });

  //create user in db
  try {
    const userDb = await user.save();
    console.log(userDb);
    return res.send({
      status: 201,
      message: "user registered",
      data :{
        _id : userDb._id,
        username : userDb.username,
        email: userDb.email
      },
    });
  } catch (error) {
    return res.send({
      status: 400,
      message: "database error, try again",
      error: error,
    });
  }
});

app.listen(8000, () => {
  console.log("Listening on Port 8000");
});
