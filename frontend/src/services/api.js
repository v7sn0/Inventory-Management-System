import axios from "axios"

const Client = axios.create({ baseURL: import.meta.env.VITE_API_URL })

Client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers["authorization"] = `Bearer ${token}`
    }
    return config
  },
  async (error) => {
    console.log(error)
  }
)

export default Client
