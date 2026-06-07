import Client from "../services/api"
import EditProduct from "../pages/EditProduct"
import { Link } from "react-router-dom"

const ShowProducts = ({ products, setProducts }) => {
  const deleteProduct = async (id) => {
    await Client.delete(`/products/delete-product/${id}`)

    const deletedProductIndex = products.findIndex(
      (product) => product._id === id
    )

    products.splice(deletedProductIndex, 1)

    // copying contents of products array after the selected product got deleted from it, to updatedProductsProp, because react isnt observing changes inside the prop "products", it just detects if what is in the memory "products in this case" is changed or no
    const updatedProductsProp = [...products]

    setProducts(updatedProductsProp)
  }

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
                <button onDoubleClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ShowProducts
