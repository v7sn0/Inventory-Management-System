import { useNavigate } from "react-router-dom"
import ShowProducts from "../components/ShowProducts"
import { useState, useEffect } from "react"
import Client from "../services/api"

const Home = ({ user, products }) => {
  const navigate = useNavigate()

  // const [currentPage, setCurrentPage] = useEffect(1)
  // const [lastProductIndex, setLastProductIndex] = useState()
  // const [firstProductIndex, setFirstProductIndex] = useState()

  // const [productsPerPage, setProductsPerPage] = useState()

  return user ? (
    <>
      <h1>Welcome to home!</h1>
      <ShowProducts products={products} />
    </>
  ) : (
    <>
      <h1>Sign in please so you can access this page.</h1>
      <button onClick={() => navigate("/sign-in")}>Sign in</button>
    </>
  )
}

export default Home
