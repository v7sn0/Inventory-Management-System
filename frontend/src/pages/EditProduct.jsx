import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Client from "../services/api"
import { useNavigate } from "react-router-dom"

const EditProduct = ({ products, setProducts }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  // const initialState = {
  //   name: "",
  //   qty: "",
  //   price: "",
  // }

  const [formState, setFormState] = useState()

  useEffect(() => {
    const getProduct = async () => {
      const chosenProduct = products.find((product) => product._id === id)

      setFormState(chosenProduct)
      console.log(formState)
    }

    getProduct()
  }, [products])

  if (!formState) return <h1>Loading</h1>

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const response = Client.put(`/products/update-product/${id}`, formState)

    const chosenProduct = products.find((product) => product._id === id)

    const updatedProductsProp = products.map((product) => {
      if (product._id === id) {
        return formState
      }
      return product
    })

    setProducts(updatedProductsProp)

    navigate("/")
  }

  return (
    <>
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

        <button>Update</button>
      </form>
    </>
  )
}

export default EditProduct
