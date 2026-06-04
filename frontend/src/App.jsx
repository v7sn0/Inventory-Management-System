import "./App.css"
import { Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import { useEffect, useState } from "react"
import { checkSession } from "./services/auth"
function App() {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const userData = await checkSession()
    setUser(userData)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
