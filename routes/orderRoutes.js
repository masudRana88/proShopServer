import express from "express";
const router = express.Router();
import  {addOrder,getOrderById,updateOrderToPay}  from "../routesControler/OrderControler.js";
import {privateRoutes} from "../Hookes/privateRoutes.js"
import cors from "cors"

// @ Add Product
// @ Private routes
// api/product
// post request
router.route('/').post(privateRoutes, addOrder)

// @ Get Product By Id
// @ Private routes
// api/product/id
// get request
router.route('/:id').get(privateRoutes,getOrderById)


// @ Update Order to pay
// @ Private routes
// api/product/:id/pay
// Put request
router.route('/pay/:id').put(updateOrderToPay);

export default router;