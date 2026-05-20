const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const middleware = require("../middleware")

router.post(
  "/add-product",
  middleware.verifyToken,
  productController.createProduct
)

router.get("/view-all", middleware.verifyToken, productController.getProducts)

module.exports = router
