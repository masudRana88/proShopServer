import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import productsRoutes from "./routes/productsRoutes.js"
import userRoutes from "./routes/userRoutes.js"
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
app.use('/api', userRoutes)


app.listen(port, () => {
    console.log("Running server on port", port)
})