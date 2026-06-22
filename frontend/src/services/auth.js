import Client from "./api"

export const signUp = async (data) => {
  try {
    const response = await Client.post("/auth/sign-up", data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const signIn = async (data) => {
  try {
    const response = await Client.post("/auth/sign-in", data)
    localStorage.setItem("token", response.data.token)
    return response.data.user
  } catch (error) {
    throw error
  }
}

export const checkSession = async () => {
  try {
    const response = await Client.get("/auth/session")
    return response.data
  } catch (error) {
    throw error
  }
}
