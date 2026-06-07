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
      <NavLink to="/"> Home </NavLink>
      <NavLink to="/add-product"> Add a Product </NavLink>
      <NavLink to="/change-password"> Change Password </NavLink>
      <NavLink to=""> </NavLink>
      <button onClick={() => signOut()}>Signout</button>
    </nav>
  ) : (
    <nav>
      <NavLink to="/sign-in">Sign in</NavLink>
      <NavLink to="/sign-up">Sign up</NavLink>
    </nav>
  )
}

export default Nav
