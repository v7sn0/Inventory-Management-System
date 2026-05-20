const bcrypt = require("bcrypt")

// hash the password when signing up
const hashPassword = async (password) => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
}

// compare the password in db with the password the user entered when signing in
const checkPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
}

module.exports = {
  hashPassword,
  checkPassword,
}
