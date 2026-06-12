const User = require("../models/User")
const middleware = require("../middleware")

const signUp = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username })
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "Error", message: "User already exists." })
    }
    hashedPassword = await middleware.hashPassword(req.body.password)
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    })
    res.status(200).json(user)
  } catch (error) {
    console.error("an error happened", error.message) // for debugging purposes
    res.status(500).json({
      status: "Error",
      message: "An error occurred while signing up.",
    })
  }
}

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res
        .status(400)
        .json({ status: "Error", message: "No user with this name." })
    }
    const checkPassword = await middleware.checkPassword(
      req.body.password,
      user.password
    )
    if (!checkPassword) {
      return res
        .status(400)
        .json({ status: "Error", message: "The password/username is wrong." })
    }

    const payload = {
      username: user.username,
      id: user._id,
    }

    const token = await middleware.createToken(payload)

    // console.log(token)
    // res.send(token)
    res.status(200).json({ user: payload, token })
  } catch (error) {
    console.error("an error occurred.", error.message)
    res.status(500).json({
      status: "Error",
      message: "An error occurred while signing in.",
    })
  }
}

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const { oldPassword, newPassword } = req.body

    if (await middleware.checkPassword(oldPassword, user.password)) {
      const hashedPassword = await middleware.hashPassword(newPassword)
      await User.findByIdAndUpdate(
        req.user.id,
        { password: hashedPassword },
        {
          returnDocument: "after",
        }
      )
      return res.status(200).json({ message: "Password changed successfully." })
    }
    res
      .status(400)
      .json({ status: "Error", message: "The old password is wrong." })
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An error occurred while changing the password.",
    })
  }
}

const checkSession = (req, res) => {
  const payload = req.user
  res.status(200).json(payload)
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  checkSession,
}
