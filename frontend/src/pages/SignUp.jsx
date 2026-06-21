import { signUp } from "../services/auth.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  let navigate = useNavigate()

  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
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
      if (formState.password === formState.confirmPassword) {
        await signUp({
          username: formState.username,
          password: formState.password,
        })
        setFormState(initialState)
        navigate("/sign-in")
      } else {
        setHandleError("Passwords must match")
      }
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <>
      <div className="sign-up-page">
        <div className="sign-up-left-side">
          <div className="form-container sign-up-and-in">
            <form onSubmit={handleSubmit}>
              <h1 className="form-title">Sign Up</h1>
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

              <label htmlFor="confirm-password" className="form-label">
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                value={formState.confirmPassword}
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className="form-input"
              />
              <button className="form-btn btn" id="sign-up-btn">
                Sign up
              </button>

              {/* <ul>
          <li>At least 8 characters</li>
          <li>At least one upper case letter</li>
          <li>At least on lower case letter</li>
          <li>At least one number</li>
          <li>At least one special character from ([#?!@$%^&*_-)</li>
        </ul> */}
            </form>
          </div>
        </div>
        <div className="sign-up-right-side">
          <div className="requirements">
            <h3>Username may</h3>
            <p>At least have three, capital or small letters.</p>
            <p>Include numbers and - and _</p>
            <p>And must not exceed 13 digit</p>
            <h3>Passwords must contain </h3>
            <p>At least 8 characters</p>
            <p>At least one upper case letter</p>
            <p>At least on lower case letter</p>
            <p>At least one number</p>
            <p>At least one special character from (#?!@$%^&*_-)</p>
          </div>
          {handleError && <p className="sign-up-error">{handleError}</p>}
        </div>
      </div>
    </>
  )
}

export default SignUp
