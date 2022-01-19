import express from "express";
const router = express.Router();
import {getProduct,getProductById} from "../routesControler/productControler.js"

// @ Get product
// @ public routes
router.route('/').get(getProduct)

// @ Get product by ID
router.route("/:id").get(getProductById)


// export 
export default router;