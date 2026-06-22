import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Nav = ({ user, setUser }) => {
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.clear()
    setUser()
    navigate("/sign-in")
  }

  return user ? (
    <nav>
      <NavLink to="/home" className="nav-links">
        Home
      </NavLink>
      <NavLink to="/add-product" className="nav-links">
        Add a Product
      </NavLink>
      <NavLink to="/change-password" className="nav-links">
        {" "}
        Change Password{" "}
      </NavLink>
      <span onClick={() => signOut()} className="nav-links">
        Signout
      </span>
    </nav>
  ) : (
    <nav>
      <NavLink to="/sign-in" className="nav-links">
        Sign in
      </NavLink>
      <NavLink to="/sign-up" className="nav-links">
        Sign up
      </NavLink>
    </nav>
  )
}

export default Nav
