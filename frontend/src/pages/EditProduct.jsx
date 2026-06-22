import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"

const EditProduct = ({ products, setProducts }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formState, setFormState] = useState()
  const [handleError, setHandleError] = useState(null)

  useEffect(() => {
    const getProduct = async () => {
      const chosenProduct = products.find((product) => product._id === id)

      setFormState(chosenProduct)
    }

    getProduct()
  }, [products])

  if (!formState) return <h1>Loading . . .</h1>

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHandleError(null)
    try {
      const response = await Client.put(
        `/products/update-product/${id}`,
        formState
      )

      const chosenProduct = products.find((product) => product._id === id)

      const updatedProductsProp = products.map((product) => {
        if (product._id === id) {
          return formState
        }
        return product
      })

      setProducts(updatedProductsProp)

      navigate("/")
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Edit Product</h1>
        <label htmlFor="name" className="form-label">
          Product Name
        </label>
        <input
          onChange={handleChange}
          value={formState.name}
          name="name"
          id="name"
          type="text"
          className="form-input"
        />

        <label htmlFor="qty" className="form-label">
          Quantity
        </label>
        <input
          onChange={handleChange}
          value={formState.qty}
          name="qty"
          id="qty"
          type="number"
          className="form-input"
        />

        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          onChange={handleChange}
          value={formState.price}
          name="price"
          id="price"
          type="number"
          className="form-input"
        />

        {handleError && <p className="error">{handleError}</p>}

        <button className="form-btn btn">Update</button>
      </form>
    </div>
  )
}

export default EditProduct
