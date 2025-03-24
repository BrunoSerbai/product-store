import { neon } from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

// creates a SQL connection using our environment variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

// this sql function we export is used as a tagged template literal, witch allows us to write sql queries safely