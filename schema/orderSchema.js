import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "User"
    },
    orderItem: [
        {
            name : {type: String, required: true},
            qtn : {type: Number, required: true},
            price : {type: Number, required: true},
            image : {type: String, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref : "Proudcts"
            },
        }
    ],
    shipping: {
       address : {type: String, required: true},
       city : {type: String, required: true},
       postCode : {type: String, required: true},
       country : {type: String, required: true}
    },
    prementMethod: {
        type: String,
        required: true,
    },
    prementResult: {
        id: {type: String, require: true},
        status : { type : String, require: true},
        update_time : { type : String, require: true},
        email : { type : String, require: true}
    },
    textPrice: {
        type: Number,
        required: true,
        default : 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    textPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    atPaid: {
        type : Date
    },
    isDeliverd: {
        type: Boolean,
        required: true,
        default: false
    },
    atDeliverd: {
        type : Date
    }
}, {
    timestamps : true
})

const Order = mongoose.model("Order", orderSchema);

export default Order