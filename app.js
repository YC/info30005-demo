const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").Server(app);

// For production, specify a list of allowed origins instead of *
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var message = "Hello";

// API get
app.get("/api", (req, res) => {
  res.json({ message });
});

// API POST
app.post("/api", (req, res) => {
  console.log(req.body);
  message = req.body.message;
  // Used for #3
  io.emit("message_changed", message);
  return res.json({ status: "success", message });
});

// Type 1, refresh page
app.get("/1", (req, res) => {
  return res.render("index", { message });
});
app.post("/1", (req, res) => {
  message = req.body.message;
  return res.render("index", { message });
});

// Type 2, just serve page, AJAX update
app.get("/2", (req, res) => {
  return res.render("index2", { message });
});

// Type 3, socket.io live update
const io = require("socket.io")(server);
io.on("connection", function(socket) {
  console.log("a user connected");
});
app.get("/3", (req, res) => {
  return res.render("index3", { message });
});

// Type 4, React
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
app.use('/4', (req, res) => {
  return res.sendFile(path.join(__dirname, 'build/index.html'));
});

server.listen(process.env.PORT || 3000);
