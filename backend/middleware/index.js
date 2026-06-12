const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// hash the password when signing up
const hashPassword = async (password) => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
}

// compare the password in db with the password the user entered when signing in
const checkPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
}

// create token
const createToken = async (payload) => {
  return await jwt.sign(payload, process.env.APP_SECRET)
}

// verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.APP_SECRET)
    if (payload) {
      req.user = payload
      return next()
    } else {
      res.status(401).json({ status: "Error", message: "Unauthorized access." })
    }
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.status(500).json({
      status: "Error",
      message: "An error occurred while verifying the token.",
    })
  }
}

module.exports = {
  hashPassword,
  checkPassword,
  createToken,
  verifyToken,
}
