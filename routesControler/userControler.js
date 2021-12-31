import asyncHandler from 'express-async-handler'
import User from "../schema/userSchema.js"
import bcrypt from "bcryptjs"
import { generateJwt } from "../Hookes/generateJwt.js";

const userLogin = asyncHandler(async (req, res) => {
    const { email, pass } = req.body
    const findUser = await User.findOne({ email })
    const authUser = await bcrypt.compareSync(pass, findUser.password)

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
    userLogin,getUserProfile
}