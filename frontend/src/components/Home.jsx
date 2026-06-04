import { useNavigate } from "react-router-dom"

const Home = ({ user }) => {
  const navigate = useNavigate()

  return user ? (
    <>
      <h1>Welcome to home!</h1>
    </>
  ) : (
    <>
      <h1>Sign in please so you can access this page.</h1>
      <button onClick={() => navigate("/sign-in")}>Sign in</button>
    </>
  )
}

export default Home
