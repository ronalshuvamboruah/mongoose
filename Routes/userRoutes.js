var express = require("express");
var UserRouter = express.Router();
const userModel = require("../Models/models");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {
  postUsers,
  getUsers,
  getSignedInUser,
} = require("../Controllers/userController");

//router

//enabling pre flight request
var whitelist = ["http://localhost:6005", "http://example2.com"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

//protected route
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, "kkk", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
}

//for creating account
UserRouter.post("/add_user", postUsers);

//to get all the users protected route
UserRouter.get("/users", authenticateToken, getUsers);



UserRouter.post("/login", getSignedInUser);


//token refresh route
// UserRouter.post("/token",tokenRefresh)

module.exports = UserRouter;
