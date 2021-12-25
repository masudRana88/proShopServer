import express from "express";
const router = express.Router();
import Product from "../schema/productsSchema.js";
import asyncHandler from 'express-async-handler'

router.get("/",asyncHandler( async (req, res) => {
    const products = await Product.find({});
    res.send(products)
}))
router.get("/:id",asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    }
    else {
        res.status(404).json({message : "This Product is not Found !!"})
    }
}))



export default router;