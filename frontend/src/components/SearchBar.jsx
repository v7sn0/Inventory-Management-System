import { useState } from "react"
import Client from "../services/api.js"

const SearchBar = ({ setProducts }) => {
  const initialState = {
    name: "",
  }

  const [handleError, setHandleError] = useState(null)

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    setHandleError(null)
    try {
      e.preventDefault()
      const response = await Client.get(
        `/products/search?name=${formState.name}`
      )
      setProducts(response.data)
      setFormState(initialState)
    } catch (error) {
      setHandleError(error.response.data.message)
      // console.log(error.response.message)
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name" id="search-label">
          Search
        </label> */}
        <input
          onChange={handleChange}
          value={formState.name}
          name="name"
          id="name"
          type="text"
          placeholder="Product Name"
          id="search-input"
        />
        <button className="btn search">Search</button>
      </form>
      {handleError && <p>{handleError}</p>}
    </div>
  )
}

export default SearchBar
