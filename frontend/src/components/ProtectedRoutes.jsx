import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = ({ user }) => {
  if (user) {
    return <Outlet />
  }
  return (
    <div className="home">
      <h1>Loading . . .</h1>
      <h5>
        If you entered this page unethicially, then sign in and try again :)
      </h5>
    </div>
  )
}

export default ProtectedRoutes
