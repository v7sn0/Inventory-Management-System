import { useNavigate } from "react-router-dom"
import ShowProducts from "../components/ShowProducts"
import Pagination from "../components/Pagination"
import { useState } from "react"
import Client from "../services/api"

const Home = ({ products, setProducts }) => {
  const navigate = useNavigate()

  return (
    <>
      <h1>Welcome to home!</h1>
      <ShowProducts products={products} setProducts={setProducts} />
    </>
  )
}

export default Home
