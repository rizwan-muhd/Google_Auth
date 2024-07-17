const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

require("./auth");

function isLoggedIn(req, res, next) {
  console.log("enter here");
  req.user ? next() : res.sendStatus(401);
}

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust secure cookie settings as needed
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",

  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/auth/google/success",
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);
app.get("/auth/google/failure", (req, res) => {
  res.send("something went wrong");
});

app.get("/auth/logout", (req, res) => {
  console.log(req.logOut);
  req.logOut(); // Provided by Passport. Terminates the login session.
  res.send({ message: "Logout successful" });
});

app.get("/auth/protected", isLoggedIn, (req, res) => {
  const name = req.user.displayName;
  res.send(`hello ${name}`);
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
