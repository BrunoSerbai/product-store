import { sql } from "../config/db.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await sql`SELECT * FROM products
         ORDER BY create_at DESC`

        console.log("Fetched products:", products)
        res.status(200).json({ success: true, data: products })

    } catch (error) {
        console.log("Error getAllProducts", error)
        res.status(500).json({ success: false, message: error.message })
    }
}
export const createProduct = async (req, res) => {
    const { name, image, price } = req.body

    if (!name || !image || !price) {
        return res.status(400).json({ sucess: false, message: "All fields are required" })
    }

    try {
        const newProduct = await sql`
       INSERT INTO products (name,price,image)
       VALUES (${name},${price},${image})
       RETURNING *`

        console.log("new product added:", newProduct)
        res.status(201).json({ success: true, data: newProduct[0] })

    } catch (error) {
        console.log("Error in createProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await sql `
        SELECT * FROM products WHERE id = ${id}`
        res.status(200).json({ success: true, data: product[0] })
       
    } catch (error) {
        console.log("Error in getProduct function")
        res.status(500).json({ sucess:false, message:"Internal Server Error"})
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, image } = req.body

    try {
        const updateProduct = await sql`
        UPDATE products
        SET name = ${name},
            price = ${price},
            image = ${image}
        WHERE id = ${id}
        RETURNING *`

        if(updateProduct.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }
        console.log("Product updated:", updateProduct)
        

        res.status(200).json({ success: true, data: updateProduct[0] })
    } catch (error) {
        console.log("Error in updateProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        await sql`DELETE FROM products WHERE id = ${id}`
    } catch (error) {
        console.log("Error in deleteProduct function", error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
