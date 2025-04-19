import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true
        }
    ],

})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

// const Order = mongoose.model('Order', orderSchema); // Order is the model name, orderSchema is the schema name & normally Models starts with the capital letters

// export default Order;
const Order = mongoose.model('Order', orderSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters

export default Order;