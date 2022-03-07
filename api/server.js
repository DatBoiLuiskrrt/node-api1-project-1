const Users = require("./users/model");
const express = require("express");
const server = express();

server.use(express.json());
//this invokation returns something that tells our server to read our data as JSON

server.get("/api/users", (req, res) => {
  //pull users from db
  //send users back to client
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened.",
        error: err.message,
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not load user",
        error: err.message,
      });
    });
});

module.exports = server;
