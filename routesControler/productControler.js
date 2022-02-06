import Product from "../schema/productsSchema.js";
import asyncHandler from 'express-async-handler'

const getProduct = asyncHandler(async (req, res) => {
    const productsList = await Product.find({});
        const productCount = productsList.length
    const page = Number(req.query.page)
    const size = Number(req.query.size)
    
    if (page || size) {
        const skip = (page-1)* size
        const limitedProduct = await Product.find({}).skip(skip).limit(size)
        
        res.send({productCount,limitedProduct})
    } else {
        res.send({productCount,productsList})
    }
})

// get top product 
const getTopProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.send(products)
})

const getProductById = asyncHandler(async (req, res) =>  {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    }
    else {
        res.status(404).json({message : "This Product is not Found !!"})
    }
})

const addProduct = asyncHandler(async(req, res)=> {
    
    if (req.body && req.files) {
        // convart image
        const image = req.files.image
        const imageData = image.data
        const encodedImage = imageData.toString("base64")
        
        const { name, brand, category, stock, price, description } = req.body

        const product = await Product.create({
            name, brand, category, stock, price, description, image: encodedImage, user: req.user.id
        })
        const products = await Product.find({})
        res.send(products)
    } else {
        res.status(400)
    }    
})

const updateProduct = asyncHandler(async (req, res) => {
    if (req.body.id) {
        const id = req.body.id
        const product = await Product.findById(id)
        product.name = req.body.name || product.name
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.stock = req.body.stock || product.stock
        product.price = req.body.price || product.price
        product.description = req.body.description || product.description
        product.user = req.user.id || product.req.user.id
        if (req.files) {
            const image = req.files.image
            const imageData = image.data
            const encodedImage = imageData.toString("base64")
            product.image = encodedImage 
        }
        else {
            product.image = product.image
        }
        await product.save()
        const products = await Product.find({})
        res.send(products)
    } else {
        res.status(400)
    }
})


const deleteProduct = asyncHandler(async (req, res) => {
    const _id = req.params.id
    if (_id) {
        await Product.deleteOne({ _id }) 
        const products = await Product.find({})
        res.send(products)
    } else {
        res.status(400)
    }
})

export {
    getProduct,getProductById,addProduct,deleteProduct,updateProduct,getTopProduct
}