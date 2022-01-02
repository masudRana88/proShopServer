import asyncHandler from 'express-async-handler'
import User from "../schema/userSchema.js"
import bcrypt from "bcryptjs"
import { generateJwt } from "../Hookes/generateJwt.js";

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

const userResister = asyncHandler(async (req, res) => {
    const { name, email, pass } = req.body;
    const isExiest = await User.findOne({ email })
    if (!name || !email || !pass) {
        res.status(400)
        throw new Error("Bad Request..")
    }
    if (isExiest) {
        res.status(400)
        throw new Error("User is Already Exiest!!")
    }
    else {
    const password = bcrypt.hashSync(pass, 10)
    const user = await User.create({
        name,
        email,
        password
    })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        }
    }
})

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

export {
    userLogin,getUserProfile,userResister
}