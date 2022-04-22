const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    age: Number,
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserShcema);
module.exports = { User };
