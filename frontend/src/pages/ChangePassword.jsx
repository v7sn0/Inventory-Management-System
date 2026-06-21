import { useState } from "react"
import Client from "../services/api"

const ChangePassword = ({ user }) => {
  const initialState = {
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formState.oldPassword === formState.confirmPassword) {
      const response = Client.put("/auth/change-password", {
        oldPassword: formState.oldPassword,
        newPassword: formState.newPassword,
      })
      setFormState(initialState)
      console.log("reached")
    }
    // console.log("no")
  }

  return (
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
        />

        <button className="form-btn btn">Change</button>
      </form>
    </div>
  )
}

export default ChangePassword
