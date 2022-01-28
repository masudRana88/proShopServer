import asyncHandler from 'express-async-handler'
import jwt from "jsonwebtoken";
import User from '../schema/userSchema.js';

export const privateRoutes = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.token
    if (token && token.startsWith("Bearer")) {
        const jwtToken = token.split(" ")[1]
        const decoded = await jwt.verify(jwtToken, process.env.JWT_PASS)
        
        req.user = decoded
        next()
    }
    }
    catch {
        res.status(401)
        throw new Error("Unathorize Access")
    }
})

export const adminRoutes = asyncHandler(async(req, res,next) => {
    
    const user = await User.findById(req.user.id)
    if (user.isAdmin) {
        next()
    }
    else {
        res.status(401)
        throw new Error("Unathorize Access")
    }
})