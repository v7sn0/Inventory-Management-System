const express = require("express")
const cors = require("cors")

const authRouter = require("./routes/authRouter")

const PORT = 3000
require("./db")
const app = express()

// allows Express to understand json data the req body
app.use(express.json())

// allows Express to understand data from the forms
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Welcome!")
})

app.listen(PORT, () => {
  console.log("We are connected on this port ", PORT)
})
