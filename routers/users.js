import express from "express";
import { getUsers, postUsers, getUserById, loginUser, registerUser, getCountUsers, deleteUsers } from "../controllers/users.js";
// import User from "../models/user.js";


const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", postUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/get/count', getCountUsers);
router.delete('/:id', deleteUsers);

export default router;
