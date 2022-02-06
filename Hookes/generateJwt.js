import jwt from "jsonwebtoken";

export const generateJwt = (id) => {
    return jwt.sign({ id }, process.env.JWT_PASS, {
        expiresIn: '360d'
    })
}