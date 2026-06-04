const express = require("express")
const router = express.Router()
const middleware = require("../middleware")
// const router = require("express").Router() same as the line above

const authController = require("../controllers/authController")

router.post("/sign-up", authController.signUp)
router.post("/sign-in", authController.signIn)
router.put(
  "/change-password",
  middleware.verifyToken,
  authController.changePassword
)
router.get("/session", middleware.verifyToken, authController.checkSession)

module.exports = router
