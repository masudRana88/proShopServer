import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"

import productsRoutes from "./routes/productsRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRouts from './routes/orderRoutes.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(fileUpload())


app.use(express.json());
dotenv.config()
connectDB()


app.get('/', (req, res) => {
    res.send("server is running");
});


// Get products
app.use('/api/products', productsRoutes)
//user Routs
app.use('/api/user', userRoutes)
// order routs
app.use('/api/order', orderRouts)



app.listen(port, () => {
    console.log("ProShop Server is  Running on port", port)
})