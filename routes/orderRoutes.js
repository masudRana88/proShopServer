import express from "express";
const router = express.Router();
import  {addOrder,getOrderById}  from "../routesControler/OrderControler.js";
import {privateRoutes} from "../Hookes/privateRoutes.js"


// @ Get product
// @ public routes
// private Routes
router.route('/').post(privateRoutes,addOrder)
router.route('/:id').get(privateRoutes,getOrderById)

export default router;