import express from "express";
const router = express.Router();
import {userLogin,userResister,getUserProfile,updateUserProfile, getUserList,deleteUser,editUserProfile} from "../routesControler/userControler.js"
import {privateRoutes,adminRoutes} from "../Hookes/privateRoutes.js"

// get user
// User Login 
router.route("/login").post(userLogin)

// register New user
router.route("/register").post(userResister)

// @ get request
// @ GET request /api/user
// Private and Adnin routes 
router.route("/").get(privateRoutes, adminRoutes, getUserList)

// @ DELETE user request
// @ delete request /api/user/:id
// Private and Adnin routes 
router.route("/:id").delete(privateRoutes, adminRoutes, deleteUser).put(privateRoutes,adminRoutes,editUserProfile)

// get user profile
// private routes
router.route("/profile").get(privateRoutes, getUserProfile)

// Update User
// Private Route
router.route("/profile").post(privateRoutes, updateUserProfile)

export default router;