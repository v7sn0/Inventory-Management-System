const Product = require("../models/Product")

const createProduct = async (req, res) => {
  try {
    if (await Product.findOne({ user: req.user.id })) {
      const existingProduct = await Product.findOne({ name: req.body.name })

      if (existingProduct) {
        return res
          .status(400)
          .json({ status: "Error", message: "Product already exists." })
      }
    }
    const product = await Product.create({
      user: req.user.id,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
    })
    res.status(200).json(product)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.status(400).json({
      status: "Error",
      message: "An error occurred while creating a product.",
    })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }) // chat GPT way, it is better in my opinion since it doesn't get the id from the params, instead it uses the id that is stored in the request object

    // const products = await Product.find({ user: req.params.id }) my way, uses id (req.params."id")

    res.status(200).json(products)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.status(400).json({
      status: "Error",
      message: "An error occurred while getting all products.",
    })
  }
}

// -----------------------------------------------------------------------------------------------------------------
// const updateProductById = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       returnDocument: "after",
//     })
//     res.status(200).json(product)
//   } catch (error) {
//     console.error("An error occurred.", error.message)
//     res.status(400).json({
//       status: "Error",
//       message: "An error occurred while updating the product.",
//     })
//   }
// }   my code, works fine but any user can update others products.
// -----------------------------------------------------------------------------------------------------------------

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        returnDocument: "after",
      }
    )
    res.status(200).json(product)
  } catch (error) {
    console.error("An error occurred.", error.message)
    res.status(400).json({
      status: "Error",
      message: "An error occurred while updating the product.",
    })
  }
} // similar to mine, only difference is with the method and a single arg, GPT enlightened me to use a different method (findOneAndUpdate instead of findByIdAndUpdate), which takes query parameter and uses it as a filter, and it fixed the issue

// -----------------------------------------------------------------------------------------------------------------
// const deleteProductById = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id)
//     res.status(200).json(product)
//   } catch (error) {
//     console.error("An error occurred", error.message)
//     res.status(400).json({
//       status: "Error",
//       message: "An error occurred while deleting a product.",
//     })
//   }
// } same issue as the update, any user can delete anyone products.
// -----------------------------------------------------------------------------------------------------------------

const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })
    res.status(200).json(product)
  } catch (error) {
    console.error("An error occurred", error.message)
    res.status(400).json({
      status: "Error",
      message: "An error occurred while deleting a product.",
    })
  }
} // I discoverd this (findOneAndDelete) function and used the same logic used in the above function and it solved it for me.

module.exports = {
  createProduct,
  getProducts,
  updateProductById,
  deleteProductById,
}
