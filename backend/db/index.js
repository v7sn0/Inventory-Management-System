const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

require("dotenv").config()

const mongoose = require("mongoose")

// optional line, to make the Mongoose not strict with the unknown fields
mongoose.set("strictQuery", false)

// function to connect to the db
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("An error occurred.", error.message)
  }
}

connect()
