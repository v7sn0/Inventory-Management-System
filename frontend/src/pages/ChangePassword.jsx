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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">Old Password</label>
        <input
          onChange={handleChange}
          value={formState.oldPassword}
          name="oldPassword"
          id="oldPassword"
          type="password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          onChange={handleChange}
          value={formState.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          type="password"
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          onChange={handleChange}
          value={formState.newPassword}
          name="newPassword"
          id="newPassword"
          type="password"
        />

        <button>Change</button>
      </form>
    </>
  )
}

export default ChangePassword
