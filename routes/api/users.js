const express = require("express");
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
router.get("/test", (req, res) =>
  res.json({
    msg: "TaxiDoo users test successfull"
  })
);

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  console.log("got a request");
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    mobile: req.body.mobile
  }).then(user => {
    if (user) {
      errors.mobile = "Mobile no already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        mobile: req.body.mobile,
        pin: req.body.pin
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.pin, salt, (err, hash) => {
          if (err) throw err;
          newUser.pin = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const mobile = req.body.mobile;
  const pin = req.body.pin;

  // Find user by email
  User.findOne({
    mobile
  }).then(user => {
    // Check for user
    if (!user) {
      errors.mobile = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(pin, user.pin).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          mobile: user.mobile
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 360000
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.pin = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      mobile: req.user.mobile,
      "registered on": req.user.date
      // 'AMIT': 'THIS IS STATE LESS COMMUNICATION VIA TOKEN'
    });
  }
);

//last line to export router
module.exports = router;
