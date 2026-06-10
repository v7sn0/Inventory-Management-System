import "./App.css"
import { Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"
import ChangePassword from "./pages/ChangePassword"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { useEffect, useState } from "react"
import { checkSession } from "./services/auth"
import Client from "./services/api"

function App() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])

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

  useEffect(() => {
    const getProducts = async () => {
      if (user) {
        const response = await Client.get("/products/view-all")
        setProducts(response.data)
      }
    }
    getProducts()
  }, [user])

  return (
    <>
      <Nav user={user} setUser={setUser} />

      <Routes>
        <Route element={<ProtectedRoutes user={user} />}>
          <Route
            path="/"
            element={
              <Home user={user} products={products} setProducts={setProducts} />
            }
          />

          <Route
            path="/add-product"
            element={
              <AddProduct
                user={user}
                products={products}
                setProducts={setProducts}
              />
            }
          />

          <Route
            path="/edit-product/:id"
            element={
              <EditProduct products={products} setProducts={setProducts} />
            }
          />

          <Route
            path="/change-password"
            element={<ChangePassword user={user} />}
          />
        </Route>

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
      </Routes>
    </>
  )
}

export default App
