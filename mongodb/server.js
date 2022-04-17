const express = require("express");
const app = express();

app.use(express.json());

const users = [];

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
