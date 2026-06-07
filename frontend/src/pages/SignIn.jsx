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

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await signIn(formState)
    setFormState(initialState)
    setUser(userData)
    if (userData) {
      navigate("/")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          value={formState.username}
          name="username"
          id="username"
          type="text"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          value={formState.password}
          name="password"
          id="password"
          type="password"
        />

        <button>Sign in</button>
      </form>
    </>
  )
}

export default SignIn
