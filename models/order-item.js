import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema); // Order is the model name, orderSchema is the schema name & normally Models starts with the capital letters

export default OrderItem;