// import { useEffect, useState } from "react"
// import Client from "../services/api"
import EditProduct from "../pages/EditProduct"
import { Link } from "react-router-dom"

const ShowProducts = ({ products }) => {
  return (
    <>
      <h1>Here are your products</h1>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.qty}</td>
              <td>
                <Link to={`/edit-product/${product._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ShowProducts
