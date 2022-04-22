const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./models/User");

const MONGO_URI =
  "mongodb+srv://JungYeonHwi:dkdlfjqb5@mongodbtutorial.ybtjy.mongodb.net/BlogService?retryWrites=true&w=majority";

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.set("debug", true);
    console.log("MongoDB connected");
    app.use(express.json());

    app.get("/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const user = await user.findOne({ _id: userId });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.get("/user", async (req, res) => {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.post("/user", async (req, res) => {
      try {
        let { username, name } = req.body;
        if (!username)
          return res.status(400).send({ err: "username is required" });
        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: "Both first and last names are required" });
        const user = new User(req.body);
        await user.save();
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.delete("/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const user = await User.findOneAndDelete({ _id });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.put("/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId))
          return res.status(400).send({ err: "invalid userId" });
        const { age, name } = req.body;
        if (!age && !namve)
          return res.status(400).send({ err: "age or name is required" });

        if (age && typeof age !== "number")
          return res.status(400).send({ err: "age must be a number" });
        if (
          name &&
          typeof name.first !== "string" &&
          typeof name.last == "string"
        )
          return res
            .status(400)
            .send({ err: "first and last name are strings" });

        let updateBody = {};
        if (age) updateBody.age = age;
        if (name) updateBody.name = name;

        const user = await User.findByIdAndUpdate(userId, updateBody, {
          new: true,
        });
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.listen(3000, () => console.log("server listening on port 3000"));
  } catch (err) {
    console.log(err);
  }
};

server();
