import express from "express";
const router = express.Router();
import {userLogin,getUserProfile} from "../routesControler/userControler.js"
import {privateRoutes} from "../Hookes/privateRoutes.js"

// get user
// User Login 
router.route("/login").get(userLogin)

// get user profile
// private routes
router.route("/profile").get(privateRoutes,getUserProfile )

export default router;