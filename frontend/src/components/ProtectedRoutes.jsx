import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = ({ user }) => {
  if (user) {
    return <Outlet />
  }
  return (
    <div className="home">
      <h1>Loading . . .</h1>
      <h5>Sign in if you are not signed in yet</h5>
    </div>
  )
}

export default ProtectedRoutes
