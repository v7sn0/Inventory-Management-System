import { useNavigate } from "react-router-dom"
import ShowProducts from "../components/ShowProducts"
import Pagination from "../components/Pagination"
import { useState, useEffect } from "react"
import Client from "../services/api"
import SearchBar from "../components/SearchBar"

const Home = ({ user, products, setProducts }) => {
  const navigate = useNavigate()

  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    const checkLoading = () => {
      products.length > 0 ? setLoading(true) : setLoading(false)
    }
    checkLoading()
  }, [products])

  return Loading ? (
    <>
      <h1>Welcome to home!</h1>
      <SearchBar setProducts={setProducts} />
      <ShowProducts products={products} setProducts={setProducts} />
    </>
  ) : (
    <>
      <h1>You have no products.</h1>
    </>
  )
}

export default Home
