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
    const products = await Product.find({ user: req.user.id }) // chat GPT way, it is better in my opinion since it doesn't get the id from the params, instead it uses the id that is stored in the request object

    // const products = await Product.find({ user: req.params.id }) my way, uses id (req.params."id")

    res.send(products)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.send("An error occurred when viewing the products.")
  }
}

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
    res.send(product)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.send("Error")
  }
}

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.send(product)
  } catch (error) {
    console.error("An error occurred", error.message)
    res.send("Error")
  }
}

module.exports = {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
}
