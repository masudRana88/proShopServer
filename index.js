import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import productsRoutes from "./routes/productsRoutes.js"
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
dotenv.config()
connectDB()


app.get('/', (req, res) => {
    res.send("server is running");
});


// Get products
app.use('/api/products', productsRoutes)


// app.get("/api/products/:id", (req, res) => {
//     const id = req.params.id
//     const product = products.find(p => p._id === id)
//     res.send(product)
// })

app.listen(port, () => {
    console.log("Running server on port", port)
})