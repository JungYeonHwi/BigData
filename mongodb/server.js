const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const users = [];

const MONGO_URI =
  "mongodb+srv://JungYeonHwi:dkdlfjqb5@mongodbtutorial.ybtjy.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  let mongodbConnection = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
  });

  console.log("MongoDB connected");

  app.post("/user", function (req, res) {
    let user = req.body;
    users.push(user);
    console.log({ user });
    return res.send({ success: true });
  });

  app.get("/user", function (req, res) {
    return res.send(users);
  });

  app.listen(3000, function () {
    console.log("server listening on port 3000");
  });
};

server();
