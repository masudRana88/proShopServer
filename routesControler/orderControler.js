import Order from '../schema/orderSchema.js'
import asyncHandler from 'express-async-handler'

const addOrder = asyncHandler(async (req, res) => {
    console.log("addOrder")
    const { textPrice,itemPrice,shippingPrice, totalPrice, orderItem, shippingAddress, prementMethod } = req.body
    // console.log(req.body)
    if (orderItem && orderItem.length === 0) {
        res.status(400)
        throw new Error("No Item")
    }
    else {
        
        const order = await Order.create({
            textPrice,itemPrice,shippingPrice, totalPrice, orderItem, shippingAddress, prementMethod, user: req.user.id
        })
        console.log(order)
        res.status(200).send(order)
    }
})

// find Order by Id
const getOrderById = asyncHandler(async (req,res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    res.send(order)
})


export {
    addOrder,getOrderById
}