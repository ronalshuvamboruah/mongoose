const userModel = require("../Models/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//function generating accessToken

 const generateAccessToken = (user) => {
  return jwt.sign({ user }, "kkk", {
    expiresIn: "15m",
  });
};

//function to generate refreshToken
// var refreshTokens = [];
 const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ user }, "kkk");

  return refreshToken;
};

//token refersh route
// const tokenRefresh = (req, res) => {
//   const refreshToken = req.body.refreshToken;

//   if (!refreshToken ) {
//     return res.sendStatus(403); // Forbidden
//   }

//   jwt.verify(refreshToken, "kkk", (err, user) => {
//     if (err) {
//       return res.sendStatus(403); // Forbidden
//     }
//     userModel.find({refreshToken})

//     const accessToken = generateAccessToken({
//       id: user.id,
//       username: user.username,
//     });
//     res.json({ accessToken });
//   });
// };

// New Sign Up
const postUsers = async (request, response) => {
  const { name, age, password } = request.body;
  const query = userModel.where({ name });
  const oldResult = await query.findOne();
  console.log(oldResult, "oldResult");
  if (oldResult) {
    return response.status(409).send("User Already Exist. Please Login");
  }
  try {
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name: name,
      password: encryptedPassword,
      age,
      accessToken: generateAccessToken({ name, age, password }),
      refreshToken: generateRefreshToken({ name, age, password }),
    });

    response.status(201).json(user);
  } catch (error) {
    response.status(500).send(error);
  }
};


//loging users
const getSignedInUser = async (req, res) => {
  try {
    const { name, password, age } = req.body;

    const result = await userModel.find({ name });
    if (!result)
      return res.status(401).json({ message: "Athentication failed" });
    const passwordMatch = bcrypt.compare(password, result.password);
    if (passwordMatch) {
      // Passwords match; user is authenticated
      // You can generate a token and send it back to the client for further authentication
      return res.status(200).json({ message: "Authentication successful" });
    } else {
      // Passwords don't match
      return res.status(401).json({ message: "Authentication failed." });
    }
  } catch (err) {
    res.send(err);
  }
};

//protected route

const getUsers = async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};



module.exports = {
  postUsers,
  getUsers,
  getSignedInUser,
  // tokenRefresh,
};
