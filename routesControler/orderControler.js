import Order from '../schema/orderSchema.js'
import asyncHandler from 'express-async-handler'
import User from '../schema/userSchema.js'


// @ Add order
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
        const user = await User.findById(req.user.id)
        const order = await Order.create({
            textPrice, itemPrice, shippingPrice, totalPrice, orderItem, shippingAddress, paymentMethod, userId: req.user.id, qty,
            userEmail: user.email
        })
        res.status(200).send(order)
    }
})

// @ Get order By Id
// @ Private routes
// api/order/id
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

// @ Get All order
// @ Private routes and admin route
// api/order/admin/order/
// get request
const getAllOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.send(orders)
})

// @ Get ALL Order By user id
// @ Private routes
// api/order/user
// get request
const getOrderbyUserId = asyncHandler(async (req,res) => {
    const userId = req.user.id
    const order = await Order.find({ user: userId })
    res.send(order)
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
        res.send("successfully payment")
    }
    else {
        res.status(400)
        throw new Error("Order is not found!")
    }
})

// @ Update Order to pay
// @ Private routes
// api/product/deleverd/
// Put request
const updateOrderToDeleverd = asyncHandler(async (req, res) => {
    
    const { id } = req.body
    const order = await Order.findById(id);
    if (order) {
        order.isDeliverd = true;
        order.atDeliverd = Date.now()
        const updateOrder = await order.save()
        res.send(updateOrder);
    }
    else {
        res.status(400)
        throw new Error("Order is not found!")
    }
})
// @ Update Order to pay
// @ Private routes
// api/product/delete/
// deldete request
const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    const order = await Order.findById(id);
    const deletOrder = order.remove()
    res.send(deletOrder)
})
export {
    addOrder,getOrderById,updateOrderToPay,getOrderbyUserId,getAllOrder,updateOrderToDeleverd,deleteOrder
}