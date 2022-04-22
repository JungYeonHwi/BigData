const express = require("express");
const app = express();
const { userRouter } = require("./routes/userRoute");
const mongoose = require("mongoose");

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

    app.use("./user", userRouter);

    app.listen(3000, () => console.log("server listening on port 3000"));
  } catch (err) {
    console.log(err);
  }
};

server();
