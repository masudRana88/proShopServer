import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    orderItem: [
        {
            name : {type: String, required: true},
            qtn : {type: Number},
            price : {type: Number, required: true},
            image : {type: String, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref : "Proudcts"
            },
        }
    ],
    shippingAddress: {
       address : {type: String, required: true},
       city : {type: String, required: true},
       zip : {type: String, required: true},
       country : {type: String, required: true}
    },
    prementMethod: {
        type: String,
    },
    prementResult: {
        id: {type: String, require: true},
        status : { type : String, require: true},
        update_time : { type : String, require: true},
        email: { type: String, require: true },
    },
    textPrice: {
        type: Number,
        required: true,
        default : 0.0
    },
    itemPrice: {
        type: Number,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    atPaid: {
        type: Date,
    },
    isDeliverd: {
        type: Boolean,
        default: false
    },
    atDeliverd: {
        type: Date,
    }
}, {
    timestamps : true
})

const Order = mongoose.model("Order", orderSchema);

export default Order