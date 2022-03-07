const express = require("express");
const server = express();
const port = 9000;

server.listen(5000, () => {
  console.log(`server listening on ${port}`);
});
