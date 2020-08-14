require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(express.json());

let todos = [
  {
    id: 1,
    text: "redux middleware lecture from the server",
    completed: false,
  },
];

let currentId = 2;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
  todos.push({ id: currentId++, ...req.body });
  res.json(todos);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
