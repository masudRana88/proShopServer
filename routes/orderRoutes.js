import express from "express";
const router = express.Router();
import  {addOrder,getOrderById,updateOrderToPay,getOrderbyUserId}  from "../routesControler/OrderControler.js";
import {privateRoutes} from "../Hookes/privateRoutes.js"
import cors from "cors"

// @ Add Product
// @ Private routes
// api/product
// post request
router.route('/').post(privateRoutes, addOrder)

// @ Get Order By Id
// @ Private routes
// api/order/id
// get request
router.route('/:id').get(privateRoutes,getOrderById)

// @ Get ALL Order By user id
// @ Private routes
// api/order/user
// get request
router.route('/:id/user').get(privateRoutes,getOrderbyUserId)


// @ Update Order to pay
// @ Private routes
// api/order/:id/pay
// Put request
router.route('/pay/:id').put(updateOrderToPay);

export default router;