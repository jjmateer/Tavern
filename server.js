require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const passport = require("passport");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

var dbUrl = "";

if (process.env.NODE_ENV === "production") {
//   dbUrl = `mongodb+srv://jjmateer:${process.env.MONGO_PW}@cluster0-q0kab.mongodb.net/storefrontdb?retryWrites=true&w=majority`;
} else {
  dbUrl = "mongodb://localhost/taverndb";
}

// Passport middleware
app.use(passport.initialize());
require("./config/passport-config.js")(passport);
app.use("/api/users", users);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Connected to MongoDB.");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
