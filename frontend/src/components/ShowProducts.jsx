import Client from "../services/api"
import EditProduct from "../pages/EditProduct"
import { Link } from "react-router-dom"
import { useState } from "react"

const ShowProducts = ({ products, setProducts }) => {
  const [handleError, setHandleError] = useState(null)
  const deleteProduct = async (id) => {
    setHandleError(null)
    try {
      await Client.delete(`/products/delete-product/${id}`)

      let productsArray = [...products]

      const deletedProductIndex = productsArray.findIndex(
        (product) => product._id === id
      )

      productsArray.splice(deletedProductIndex, 1)

      // copying contents of products array after the selected product got deleted from it, to updatedProductsProp, because react isnt observing changes inside the prop "products", it just detects if what is in the memory "products in this case" is changed or no
      // const updatedProductsProp = [...products]

      // Updated: I knew from GPT that using the state directly in an assignment is not a good practice, and can potentially cause problems. Thats why I am using the array "productsArray" to store the product state value and then modify the newly created array.

      // const updatedProductsProp = [...products]

      setProducts(productsArray)
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <div className="table-container">
      {/* <h1>Here are your products</h1> */}

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
                  <button className="btn edit">Edit</button>
                </Link>
                <button
                  className="btn delete"
                  onDoubleClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {handleError && <p>{handleError}</p>}
    </div>
  )
}

export default ShowProducts
