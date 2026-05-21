const User = require("../models/User")
const middleware = require("../middleware")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      return res.send("User already exists.")
    }
    hashedPassword = await middleware.hashPassword(req.body.password)
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    })
    res.send(user)
  } catch (error) {
    /* res.json({
      success: false,
      message: "An error occurred.",
      error: error.message
    }) // template, to be used in all controllers when React is created*/

    console.error("an error happened", error.message) // for debugging purposes
  }
}

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.send("No user with this name.")
    }
    const checkPassword = await middleware.checkPassword(
      req.body.password,
      user.password
    )
    if (!checkPassword) {
      return res.send("Wrong password")
    }

    const payload = {
      username: user.username,
      id: user._id,
    }

    const token = await middleware.createToken(payload)

    // console.log(token)
    res.send(token)
  } catch (error) {
    console.error("an error occurred.", error.message)
    res.status()
  }
}

module.exports = {
  signUp,
  signIn,
}
