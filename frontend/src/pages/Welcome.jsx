import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
const Welcome = ({ user }) => {
  if (user) {
    return <Navigate to="/home" />
  }
  return (
    <div className="home">
      <h1>Welcome to IMS</h1>
      <h2>Create an account to use it, or sign in if you have one already</h2>

      <Link to="/sign-in">
        <button className="welcome-page-btn">Sign in</button>
      </Link>

      <Link to="sign-up">
        <button className="welcome-page-btn">Sign up</button>
      </Link>
    </div>
  )
}

export default Welcome
