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
        message: "Could not load all users",
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
        message: "Could not load user with the specified id",
        error: err.message,
      });
    });
});

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      message: "Name and Bio are require my friend.",
    });
  } else {
    Users.insert(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "error posting new user",
          error: err.message,
        });
      });
  }
});

server.put("/api/users", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updated = await Users.update(id, body);
    if (!updated) {
      res.status(404).json({
        message: `User by id ${id} does not exist`,
      });
    } else {
      res.json(updated);
    }
  } catch (err) {
    res.status(500).json({
      message: "error updating existing dog",
      error: err.message,
    });
  }
});

module.exports = server;
