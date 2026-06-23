import { useState } from "react"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"

const AddProduct = ({ user, products, setProducts }) => {
  const navigate = useNavigate()

  const initialState = {
    name: "",
    qty: "",
    price: "",
  }

  const [formState, setFormState] = useState(initialState)
  const [handleError, setHandleError] = useState(null)

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
      const response = await Client.post("/products/add-product", {
        user: user.id,
        ...formState,
      })

      const updatedProductsProp = [...products]

      updatedProductsProp.push(response.data)

      setFormState(initialState)
      setProducts(updatedProductsProp)
      navigate("/")
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Add Item</h1>

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
          placeholder="Product name"
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
          placeholder="e.g. 300"
        />

        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          onChange={handleChange}
          value={formState.price}
          name="price"
          id="price"
          type="text"
          className="form-input"
          placeholder="e.g. 30.99"
          pattern="^\d{1,3}(\.\d{1,3})?$"
        />

        {handleError && <p className="error">{handleError}</p>}

        <button className="btn form-btn">Create</button>
      </form>
    </div>
  )
}

export default AddProduct
