import express from "express";
import { getOrders, postOrders, getOrdersById, updateOrders, deleteOrders, getTotalSales, getOrderCount, getUserOrders } from "../controllers/orders.js";

// import Order from "../models/order"?;

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrdersById);
router.get("/get/totalsales", getTotalSales);
router.get("/get/ordercount", getOrderCount);
router.get("/get/userorders/:userid", getUserOrders);
router.post("/", postOrders);
router.put("/:id", updateOrders);



router.delete("/:id", deleteOrders)

export default router;