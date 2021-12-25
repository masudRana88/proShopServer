import  mongoose  from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./user.js"
import products from "./products.js";
import User from "./schema/userSchema.js"
import Product from "./schema/productsSchema.js"
import Order from "./schema/orderSchema.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const importData = async () => {

    try {
    const createUser = await User.insertMany(users);
        
    const adminUser = createUser[0]._id
    const sempleProducts = products.map(p => {
    return { ...p, user : adminUser}
    })
        
    await Product.insertMany(sempleProducts);
        console.log("data ipmorded".green.inverse)
        process.exit()
    }
    catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log("data Deleted".red.inverse)
        process.exit()
    }
    catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}
    
if (process.argv[2] === "-d") {
    destroyData()
}
else {
    importData()
}