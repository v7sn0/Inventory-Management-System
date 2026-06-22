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

    // interactive username

    if (e.target.name === "username") {
      let userReq1 = document.querySelector("#userReq1")

      ;/[a-zA-Z]{3}/.test(event.target.value)
        ? userReq1.classList.add("correct")
        : userReq1.classList.remove("correct")
      // ;/[0-9_-]/g.test(event.target.value)
      //   ? userReq2.classList.add("correct")
      //   : userReq2.classList.remove("correct")
    }

    // interactive password

    if (e.target.name === "password") {
      const pasReq1 = document.querySelector("#pasReq1")
      const pasReq2 = document.querySelector("#pasReq2")
      const pasReq3 = document.querySelector("#pasReq3")
      const pasReq4 = document.querySelector("#pasReq4")
      const pasReq5 = document.querySelector("#pasReq5")
      const pasReq6 = document.querySelector("#pasReq6")

      ;/[A-Z]/g.test(event.target.value)
        ? pasReq1.classList.add("correct")
        : pasReq1.classList.remove("correct")
      ;/[a-z]/g.test(event.target.value)
        ? pasReq2.classList.add("correct")
        : pasReq2.classList.remove("correct")
      ;/[0-9]/g.test(event.target.value)
        ? pasReq3.classList.add("correct")
        : pasReq3.classList.remove("correct")
      ;/[#?!@$%^&*_-]/g.test(event.target.value)
        ? pasReq4.classList.add("correct")
        : pasReq4.classList.remove("correct")
      ;/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,16}$/g.test(
        event.target.value
      )
        ? pasReq5.classList.add("correct")
        : pasReq5.classList.remove("correct")
    }
    /////
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
      <div className="two-sides-page">
        <div className="two-sides-left-side">
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
                maxLength={15}
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
                maxLength={16}
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
                maxLength={16}
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
        <div className="two-sides-right-side">
          <div className="requirements">
            <h3>Username must</h3>
            <p id="userReq1">
              At least have three, capital or small letters{" "}
              <span className="not-required">
                {" "}
                (and may include numbers - and _ but that's not required){" "}
              </span>
            </p>
            {/* <p id="userReq2">
              Include numbers and - and _{" "}
              <span class="not-required">(not required)</span>
            </p> */}
            <h3>Passwords must contain </h3>

            <p id="pasReq1">At least one upper case letter</p>
            <p id="pasReq2">At least on lower case letter</p>
            <p id="pasReq3">At least one number</p>
            <p id="pasReq4">
              At least one special character from (#?!@$%^&*_-)
            </p>
            <p id="pasReq5">At least 8 characters, upto 16 characters</p>
            {/* <p id="pasReq6">At most 16 characters</p> */}
          </div>
          {handleError && <p className="error">{handleError}</p>}
        </div>
      </div>
    </>
  )
}

export default SignUp
