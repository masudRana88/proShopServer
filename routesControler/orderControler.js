import Order from '../schema/orderSchema.js'
import asyncHandler from 'express-async-handler'


// @ Add Product
// @ Private routes
// api/product
// post request
const addOrder = asyncHandler(async (req, res) => {
    const { textPrice,itemPrice,shippingPrice, totalPrice, orderItem, shippingAddress, paymentMethod,qty } = req.body
    if (orderItem && orderItem.length === 0) {
        res.status(400)
        throw new Error("No Item")
    }
    else {
        
        const order = await Order.create({
            textPrice,itemPrice,shippingPrice, totalPrice, orderItem, shippingAddress, paymentMethod, user: req.user.id,qty
        })
        res.status(200).send(order)
    }
})

// @ Get Product By Id
// @ Private routes
// api/product/id
// get request
const getOrderById = asyncHandler(async (req,res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    if (order) {
        res.send(order)
    }
    else {
        res.status(400)
    }
})

// @ Update Order to pay
// @ Private routes
// api/product/:id/pay
// Put request
const updateOrderToPay = asyncHandler(async (req, res) => {
    const {id} = req.params
    const order = await Order.findById(id);
    if (order) {
        order.isPaid = true;
        order.atPaid = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email: req.body.payer.email_address
        }
        const updateOrder = await order.save()
        res.send(updateOrder);
        console.log(req.body)
        res.send("successfully payment")
    }
    else {
        res.status(400)
        throw new Error("Order is not found!")
    }
})


// @ Get ALL Order By user id
// @ Private routes
// api/order/user
// get request
const getOrderbyUserId = asyncHandler(async (req,res) => {
    const userId = req.body.user._id;
    const order = await Order.find({ userId })
    if (order.length > 0) {
        res.send(order)
    }
    else {
        res.send({})
    }
})

export {
    addOrder,getOrderById,updateOrderToPay,getOrderbyUserId
}