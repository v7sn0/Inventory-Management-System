const express = require("express")
const router = express.Router()
// const router = require("express").Router() same as the line above

const authController = require("../controllers/authController")

router.post("/sign-up", authController.signUp)
router.put("/sign-in", authController.signIn)

module.exports = router
