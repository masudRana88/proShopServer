import asyncHandler from 'express-async-handler'
import User from "../schema/userSchema.js"
import bcrypt from "bcryptjs"
import { generateJwt } from "../Hookes/generateJwt.js";

// @ Login User
const userLogin = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const pass = password
    const findUser = await User.findOne({ email })
    if (!findUser) {
        res.status(401)
        throw new Error("Email and password is not valid")
    }

    const authUser = await bcrypt.compareSync(pass, findUser.password)
    if (!authUser) {
        res.status(401)
        throw new Error("Email and password is not valid")
    }
    if (authUser) {
        res.json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            isAdmin: findUser.isAdmin,
            token : generateJwt(findUser._id)
        })
    }
    else {
        res.status(401)
        throw new Error("Unathorize")
    }
})
// @ Register New User
const userResister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // chack have Name
    if (!name) {
        res.status(400).json({message: "Please Enter your Name"})
        throw new Error("user name is nor defined")
    }
    // Chack have Email
    if (!email) {
        res.status(400).json({message: "Please Enter your Email"})
        throw new Error("user email is nor defined")
    }
    // Chack have password
    if (!password) {
        res.status(400).json({message: "Please Enter your Password"})
        throw new Error("user Password is nor defined")
    }
    // chack Uase Allready Exiest ot not
    const isExiest = await User.findOne({ email })
    if (isExiest) {
        res.status(400)
        res.send({ message: "User is Allready Exiest !!" })
        throw new Error("User is Already Exiest!!")
    }
    else {
    const encriptPass = bcrypt.hashSync(password, 10)
    const user = await User.create({
        name,
        email,
        password : encriptPass
    })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                message: "Register successfull !!"
            })
        }
        else {
            res.status(400).json({message: "Something is Wrong !! User are not create..."})
        }
    }
})

// @ get request
// @ GET request
// Private and Adnin routes 
const getUserList = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password")
    if (users) {
        res.send(users)
    }
    else {
        res.status(404)
        throw new Error("User is not found!")
    }
})

// @ get User
// @ Private Route
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    console.log(user)
    res.send({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    })
})

// @ DELET User
// @ Private Routes and Admin Routes
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id
    // Chaking user
    const userFind = await User.findById({ _id: userId })
    if(userFind === null){
        res.status(400).send("user is not found !!")
        throw new Error("user is nor found for delete")
    }
    // Delete user
    if (userFind&& userId) {
        const deleteUser = await User.deleteOne({ _id: userId })
        if (deleteUser.deletedCount === 1) {
            const users = await User.find({}).select("-password")

            res.send(users)
        }
    }
    
})

// @ Upgate User
// Private Route
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.user.password) {
            const encriptPass = bcrypt.hashSync(req.user.password, 10)
            user.password =  encriptPass
        }
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : generateJwt(user._id)
        })
    }

})
const editUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(req.body)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;
        await user.save()
        const users = await User.find({})
        res.send(users)
    }
    else {
        res.status(400)
        throw new Error("user is not found for Edit")
    }
})
export {
    userLogin,getUserProfile,userResister,updateUserProfile,getUserList,deleteUser,editUserProfile
}