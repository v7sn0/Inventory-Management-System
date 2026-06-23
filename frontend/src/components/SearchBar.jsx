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
    e.preventDefault()
    setHandleError(null)
    try {
      const response = await Client.get(
        `/products/search?name=${formState.name}`
      )
      setProducts(response.data)
      setFormState(initialState)
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formState.name}
          name="name"
          id="name"
          type="text"
          placeholder="e.g. Wooden crates"
          id="search-input"
        />
        <button className="btn search">Search</button>
      </form>
      {handleError && <p className="error">{handleError}</p>}
    </div>
  )
}

export default SearchBar
