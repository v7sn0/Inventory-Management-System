import { signIn } from "../services/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  const initialState = {
    username: "",
    password: "",
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
    try {
      const userData = await signIn(formState)
      setFormState(initialState)
      setUser(userData)
      if (userData) {
        navigate("/")
      }
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <div className="form-container sign-up-and-in">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Sign In</h1>
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          onChange={handleChange}
          value={formState.username}
          name="username"
          id="username"
          type="text"
          className="form-input"
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={handleChange}
          value={formState.password}
          name="password"
          id="password"
          type="password"
          className="form-input"
        />

        <button className="form-btn btn">Sign in</button>
        {handleError && <p className="error">{handleError}</p>}
      </form>
    </div>
  )
}

export default SignIn
