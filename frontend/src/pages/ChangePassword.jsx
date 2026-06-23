import { useState } from "react"
import Client from "../services/api"

const ChangePassword = ({ user }) => {
  const initialState = {
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  }

  const [formState, setFormState] = useState(initialState)
  const [handleError, setHandleError] = useState(null)
  const [handleSuccess, setHandleSuccess] = useState(null)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

    if (e.target.name === "newPassword") {
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHandleError(null)
    setHandleSuccess(null)
    try {
      if (
        formState.oldPassword === formState.confirmPassword &&
        formState.oldPassword !== "" &&
        formState.confirmPassword !== ""
      ) {
        const response = await Client.put("/auth/change-password", {
          oldPassword: formState.oldPassword,
          newPassword: formState.newPassword,
        })
        setFormState(initialState)
        setHandleSuccess(response.data.message)
      } else {
        setHandleError(
          "Old password must be the same as the confirmation password, and must not be empty"
        )
      }
    } catch (error) {
      setHandleError(error.response.data.message)
    }
  }

  return (
    <div className="two-sides-page">
      <div className="two-sides-left-side">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1 className="form-title">Change Password</h1>
            <label htmlFor="oldPassword" className="form-label">
              Old Password
            </label>
            <input
              onChange={handleChange}
              value={formState.oldPassword}
              name="oldPassword"
              id="oldPassword"
              type="password"
              className="form-input"
              placeholder="Enter old password"
            />

            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={formState.confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Confirm old password"
            />

            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              onChange={handleChange}
              value={formState.newPassword}
              name="newPassword"
              id="newPassword"
              type="password"
              className="form-input"
              placeholder="Enter new password"
            />

            <button className="form-btn btn">Change</button>
          </form>
        </div>
      </div>
      <div className="two-sides-right-side">
        <div className="requirements">
          <h3>Passwords must contain </h3>

          <p id="pasReq1">At least one upper case letter</p>
          <p id="pasReq2">At least on lower case letter</p>
          <p id="pasReq3">At least one number</p>
          <p id="pasReq4">At least one special character from (#?!@$%^&*_-)</p>
          <p id="pasReq5">At least 8 characters, upto 16 characters</p>
        </div>
        {handleSuccess && <p className="success">{handleSuccess}</p>}
        {handleError && <p className="error">{handleError}</p>}
      </div>
    </div>
  )
}

export default ChangePassword
