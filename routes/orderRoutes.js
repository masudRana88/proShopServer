import express from "express";
const router = express.Router();
import {adminRoutes, privateRoutes} from "../Hookes/privateRoutes.js"
import cors from "cors"
import { addOrder, deleteOrder, getAllOrder, getOrderById, getOrderbyUserId, updateOrderToDeleverd, updateOrderToPay } from "../routesControler/orderControler.js";

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
// api/order/user/order
// get request
router.route('/user/order').get(privateRoutes,getOrderbyUserId)

// @ Get ALL Order 
// @ Private routes and admin routs
// api/order/admin/order/
// get request
router.route('/admin/order').get(privateRoutes,adminRoutes,getAllOrder)


// @ Update Order to deleverd
// @ Private routes And admin routs
// api/order/deleverd/:id
// Put request
router.route('/deleverd/').put(privateRoutes, adminRoutes, updateOrderToDeleverd);

// @ Order delete
// @ Private routes And admin routs
// api/order/delete/
// Put request
router.route('/delete/:id').delete(deleteOrder);

// @ Update Order to pay
// @ Private routes
// api/order/:id/pay
// Put request
router.route('/pay/:id').put(privateRoutes,updateOrderToPay);



export default router;