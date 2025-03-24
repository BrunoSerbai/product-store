import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import { sql } from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"

dotenv.config() // Load environment variables from .env file

const PORT = process.env.PORT || 3000
const app = express()

// Middleware
app.use(helmet()) // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(express.json()) // express.json() is a middleware that parses incoming requests with JSON payloads and is based on a built-in middleware in Express
app.use(morgan('dev')) // morgan is a middleware that logs HTTP requests
app.use(cors()) // cors is a middleware that enables Cross-Origin Resource Sharing (CORS)

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
