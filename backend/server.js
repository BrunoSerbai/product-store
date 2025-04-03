import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import { sql } from "./config/db.js"
import arcjet from './lib/arcjet.js'

import productRoutes from "./routes/productRoutes.js"

dotenv.config() // Load environment variables from .env file

const PORT = process.env.PORT || 3000
const app = express()

// Middleware
app.use(helmet()) // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(express.json()) // express.json() is a middleware that parses incoming requests with JSON payloads and is based on a built-in middleware in Express
app.use(morgan('dev')) // morgan is a middleware that logs HTTP requests
app.use(cors()) // cors is a middleware that enables Cross-Origin Resource Sharing (CORS)

// Apply Arcjet rate-limit to all routes 
app.use(async (req,res,nest) => {
  try{
    const decision = await arcjet.protect(req, {
      requested:1 // specifies that a request consumes 1 token
    })

    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        res.status(429).json({success: false,message: "Too many requests"})
      }
      else if(decision.reason.isBot()){
        res.status(403).json({success: false,message: "Bot access denied"})
      }
      else{
        res.status(403).json({success: false,message: "Forbidden"})
      }
      return
    }
    // check for spoofed bots
    if (decision.results.some((result)=> result.reason.isBot() && result.reason.isSpoofed())){
      res.status(403).json({success: false,message: "Bot access denied"})
      return
    }
    nest() 
  } catch (error) {
    console.log("Error in Arcjet middleware", error)
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
})

async function initDB() {
    try {
      await sql `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`   

      console.log("Database initialized")

    } catch (error) {
        console.log("Error initDB", error)
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

initDB()

// Routes
app.use("/api/products", productRoutes) 
