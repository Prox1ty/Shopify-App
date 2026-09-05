import { Router } from "express";
import { Product } from "../models/product.js";

const routes = Router();

routes.get('/api/products/:lastId', async (req, res) => {
    const LIMIT = 6;
    const lastId = Number(req.params.lastId);

    if (!Number.isInteger(lastId)) {
        return res.status(400).json({ error: "lastId must be an integer" });
    }

    try {
        const query = lastId === -1 ? {} : { catalogId: { $gt: lastId } };
        const products = await Product.find(query)
            .sort({ catalogId: 1 })
            .limit(LIMIT + 1)
            .lean();
            
        const hasMore = products.length > LIMIT;
        const visibleProducts = products.slice(0, LIMIT);

        const response = visibleProducts.map(({ catalogId, ...product }) => ({
            ...product,
            id: catalogId,
        }));


        return res.status(200).json({
            products: response,
            hasMore
        });
    } catch (err) {
        console.error("Product fetch failed:", err.message);
        return res.status(500).json({ error: "Failed to fetch products" });
    }
});

routes.get('/api/get/:prodId', async(req, res) => {
    const {prodId} = req.params;
    try {
        const product = await Product.findOne({ catalogId: prodId });
        return res.status(200).json({ product });
    } catch (err) {
        return res.status(500).json({ error: "Could not find product" });
    }   
})

export { routes as productRoute };