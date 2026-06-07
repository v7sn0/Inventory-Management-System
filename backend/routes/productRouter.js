const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const middleware = require("../middleware")

router.post(
  "/add-product",
  middleware.verifyToken,
  productController.createProduct
)

router.get("/view-all", middleware.verifyToken, productController.getProducts) // this is the way that works with the chat GPT way

// router.get(
//   "/view-all/:id",
//   middleware.verifyToken,
//   productController.getProducts
// ) my way, uses id (req.params."id")

router.get(
  "/view-product/:id",
  middleware.verifyToken,
  productController.getProductByID
)

router.put(
  "/update-product/:id",
  middleware.verifyToken,
  productController.updateProductById
)

router.delete(
  "/delete-product/:id",
  middleware.verifyToken,
  productController.deleteProductById
)

module.exports = router
