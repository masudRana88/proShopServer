import express from "express";
const router = express.Router();
import { getProduct, getProductById, addProduct,deleteProduct ,updateProduct} from "../routesControler/productControler.js"
import {privateRoutes,adminRoutes} from "../Hookes/privateRoutes.js"

// @ Get product
// @ public routes
router.route('/').get(getProduct)

// @ Get product by ID
router.route("/:id").get(getProductById)

// POST request
// ADD PRODUCT
// ADMIN Route and Privare Routes
// api/products/admin/add-product
router.route("/admin/add-product").post(privateRoutes, adminRoutes, addProduct)

// DEETE request
// DELETE PRODUCT
// ADMIN Route and Privare Routes
// api/products/admin/delete-product
router.route("/admin/delete-product/:id").delete(privateRoutes,adminRoutes,deleteProduct)

// PUT request
// Update PRODUCT
// ADMIN Route and Privare Routes
// api/products/admin/update-product
router.route("/admin/update-product").put(privateRoutes,adminRoutes,updateProduct)

// export 
export default router;