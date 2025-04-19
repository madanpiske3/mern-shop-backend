// import Order from "../models/order";
import Order from "../models/order.js";
import OrderItem from "../models/order-item.js"; // Ensure OrderItem is imported
import { populate } from "dotenv";
import mongoose from "mongoose";

const getOrders = async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    if (!orderList) return res.status(404).json({ success: false, message: 'Orders not found' });
    console.log(orderList);
    res.status(200).json(orderList);
        // res.send("Orders API is working! from controllers to routers to your browser!");
}

export const getOrdersById = async (req, res) => {
    // const orderList = await Order.findById(req.params.id).populate('user', 'name').populate('orderItems');
    const orderList = await Order.findById(req.params.id).populate('user', 'name').populate({ path: 'orderItems', populate: { path: 'product', populate: 'category'} });
    if (!orderList) return res.status(404).json({ success: false, message: 'Orders not found' });
    // console.log(orderList);
    res.status(200).json(orderList);
        // res.send("Orders API is working! from controllers to routers to your browser!");
    
}

export const postOrders = async (req, res) => {

    const orderItemsId = await Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        });
        newOrderItem = await newOrderItem.save();
        console.log(newOrderItem);
        return newOrderItem._id;
    }))
        // return newOrderItem._id;
    // console.log(orderItemsId);


    try {
    const orderItemsIdsResolved = await Promise.all(orderItemsId);
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice =  orderItem.product.price * orderItem.quantity;
        return totalPrice;
    })); // return an array of total prices [10, 20, 30]

    console.log(totalPrices);
    const x = totalPrices.reduce((a, b) => a + b, 0); // sum of all total prices
        const order = new Order({
            orderItems: orderItemsId,
            name: req.body.name,
            email: req.body.email,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            phone: req.body.phone,
            totalPrice: x,
            country: req.body.country,
            city: req.body.city,
            zip: req.body.zip,
            user: req.body.user
        })
        // console.log(order);
        // return res.status(201).json(order); // Send the created order as a response
        const savedOrder = await order.save();
        res.status(201).json(savedOrder); // Send the created order as a response
    }catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const getTotalSales = async (req, res) => {
    // res.send("Get Total Sales API is working! from controllers to routers to your browser!");
    const totalSales = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: '$totalPrice' }}}])
    if (!totalSales || totalSales.length === 0) return res.status(404).json({ success: false, message: 'Total sales not found' });
    console.log(totalSales);
    res.status(200).json({ totalSales: totalSales[0].totalSales }); // Send the total sales as a response
}

export const getOrderCount = async (req, res) => {
    try {
        const orderCount = await Order.countDocuments();
        if (!orderCount) return res.status(404).json({ success: false, message: 'Order count not found' });
        res.status(200).json({ orderCount: orderCount }); // Send the total sales as a response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getUserOrders = async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid }).populate({
        path: 'orderItems', populate: { path: 'product', populate: 'category'}
    }).sort({'dateOrdered': -1});

    if (!userOrderList) return res.status(404).json({ success: false, message: 'Orders not found' });
    console.log(userOrderList);
    res.status(200).json(userOrderList);
    
}

const updateOrders = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {status: req.body.status},
        { new: true }
    )
    if (!order) return res.status(404).json({ success: false, message: 'Orders not found' });
    res.status(200).json(order);
}

const deleteOrders = async (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem);
            })
            return res.status(200).json({ success: true, message: 'Order deleted successfully' });
        }else {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
    }).catch(err => {
        res.status(500).json({ success: false, error: err });
    })


    // res.send("Delete Orders API is working! from controllers to routers to your browser!");
    // if (!mongoose.isValidObjectId(req.params.id)){
    //     return res.status(400).send('Invalid Order ID');
    // }

    // try {
    //     const order = await Order.findById(req.params.id);
    //     if (!order) {
    //         return res.status(400).send('Order not found');
    //     }
    //     await Order.findByIdAndDelete(req.params.id);
    //     res.send(order);

    // }catch (error) {
    //     res.status(500).json({ success: false, message: error.message });
    // }
}

// export default getOrders;
export { getOrders, updateOrders, deleteOrders };





// postOrders

    // const orderItemsId = await Promise.all(req.body.orderItems.map(async orderItem => {
    //     const newOrderItem = new OrderItem({
    //         quantity: orderItem.quantity,
    //         product: orderItem.product
    //     });
    //     const savedOrderItem = await newOrderItem.save();
    //     return savedOrderItem._id;
    // }));