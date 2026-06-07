import { useState } from "react"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"

const AddProduct = ({ user }) => {
  const navigate = useNavigate()

  const initialState = {
    name: "",
    qty: "",
    price: "",
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  if (!user) {
    return (
      <>
        <h2>Loading...</h2>
        <p>If the page did not work, maybe you are not signed in</p>
        <button onClick={() => navigate("/sign-in")}>Sign in</button>
      </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await Client.post("/products/add-product", {
      user: user.id,
      ...formState,
    })
    console.log(response)
    setFormState(initialState)
  }

  return (
    <div>
      <h1>Add Item</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name</label>
        <input
          onChange={handleChange}
          value={formState.name}
          name="name"
          id="name"
          type="text"
        />

        <label htmlFor="qty">Quantity</label>
        <input
          onChange={handleChange}
          value={formState.qty}
          name="qty"
          id="qty"
          type="number"
        />

        <label htmlFor="price">Price</label>
        <input
          onChange={handleChange}
          value={formState.price}
          name="price"
          id="price"
          type="number"
        />

        <button>Create</button>
      </form>
    </div>
  )
}

export default AddProduct
