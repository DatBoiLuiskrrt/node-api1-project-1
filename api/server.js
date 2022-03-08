const Users = require("./users/model");
const express = require("express");
const res = require("express/lib/response");
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
        message: "The users information could not be retrieved",
        error: err.message,
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Could not load user with the specified id",
        error: err.message,
      });
    });
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else {
    Users.insert(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          error: err.message,
        });
      });
  }
});

server.put("/api/users/:id", (req, res) => {
  const user = req.body;

  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
    return;
  }

  Users.update(req.params.id, user)
    .then((user) => {
      if (user == null) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The user information could not be modified" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.json(deletedUser);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user could not be removed",
        error: err.message,
      });
    });
});

module.exports = server;
