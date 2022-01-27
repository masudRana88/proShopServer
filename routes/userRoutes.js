import express from "express";
const router = express.Router();
import {userLogin,userResister,getUserProfile,updateUserProfile, getUserList} from "../routesControler/userControler.js"
import {privateRoutes,adminRoutes} from "../Hookes/privateRoutes.js"

// get user
// User Login 
router.route("/login").post(userLogin)

// register New user
router.route("/register").post(userResister)

// @ get request
// @ GET request /api/user
// Private and Adnin routes 
router.route("/").get(privateRoutes,adminRoutes,getUserList)

// get user profile
// private routes
router.route("/profile").get(privateRoutes, getUserProfile)

// Update User
// Private Route
router.route("/profile").post(privateRoutes, updateUserProfile)

export default router;