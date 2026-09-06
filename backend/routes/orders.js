import { Router } from "express";
import { Order} from "../models/orders.js";

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
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required. Please log in to complete checkout."
        });
    }

    try {
        const { items, qty, total } = req.body;
        console.log(items);
        const cartItemsArr = items.map(item => ({
            productId: item.id,
            name: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.img || null
        }));    

        const order = await Order.create({
            products: cartItemsArr,
            totalAmount: total,
            totalQuantity: qty,
            userId: req.user._id
        });


        return res.status(201).json({
            success: true,
            orderId: order._id
        });
    } catch(err) {
        console.log(err.message);
        return res.status(500).json({message: "Server error", error: err.message});
    }
});


export { router as ordersRoute };