import { useNavigate } from "react-router-dom"
import ShowProducts from "../components/ShowProducts"
import Pagination from "../components/Pagination"
import { useState } from "react"
import Client from "../services/api"

const Home = ({ user, products, setProducts }) => {
  const navigate = useNavigate()

  return user ? (
    <>
      <h1>Welcome to home!</h1>
      <ShowProducts products={products} setProducts={setProducts} />
    </>
  ) : (
    <>
      <h1>Sign in please so you can access this page.</h1>
      <button onClick={() => navigate("/sign-in")}>Sign in</button>
    </>
  )
}

export default Home
