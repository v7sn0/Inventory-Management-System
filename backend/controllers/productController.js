const Product = require("../models/Product")

const createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ name: req.body.name })
    if (existingProduct) {
      return res.send("Product already exists.")
    }
    const product = await Product.create({
      user: req.user.id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
    })
    res.send(product)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.send("Error")
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.send(products)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.send("An error occurred when viewing the products.")
  }
}

module.exports = {
  createProduct,
  getProducts,
}
