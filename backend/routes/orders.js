import { Router } from "express";
import { Order } from "../models/orders";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const response = await Order.find({});

        res.status(200).json({
            orders: response
        });
        
    } catch (error) {
        res.status(500).json({ error: "Server could not fetch orders" });
    }
});

router.post('/', async (req, res) => {
    const { catalogId, name, price, quantity } = req.body;
})