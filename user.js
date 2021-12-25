import bcrypt from "bcryptjs"

const users = [
    {
        name: "Admin user",
        email: "admin@admin.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: "true"
    },
    {
        name: "Mahim uddic",
        email: "mahim@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: "true"
    },
    {
        name: "Masud rana",
        email: "masud@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: "true"
    },
]


export default users;