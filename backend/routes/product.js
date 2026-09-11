import { Router } from "express";
import { Product } from "../models/product.js";
import { Counter } from "../models/counter.js";
import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import fs from "fs/promises";

const routes = Router();
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve(currentDirectory, '../public/uploads'));
    },
    filename: function(req, file, cb) {
        const fileName = `${Date.now()} - ${file.originalname}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage });

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

routes.post('/api/products', upload.single('image'), async (req, res, next) => {
    try {
        const { name, price, stock, description, specs } = req.body;
        const counter = await Counter.findOneAndUpdate({ _id: "products" }, { $inc: { sequenceValue: 1 } }, { returnDocument: 'after', upsert: true });
        const product = await Product.create({
            catalogId: counter.sequenceValue,
            name,
            price,
            stock,
            description,
            specs,
            imageUrl: `/uploads/${req.file ? req.file.filename: null}`
        });

        return res.status(201).json({ product });
    } catch (err) {
        return res.status(500).json({message: `Error, could not create product: ${err}`});
    }

});

routes.delete('/api/products/:prodId', async (req, res) => {
    const productId = req.params.prodId;
    try {
        const result = await Product.findOneAndDelete({ catalogId: Number.parseInt(productId, 10) });

        if (!result) {
            return res.status(404).json({ error: "Product not found" });
        }

        await deleteFile(result.imageUrl);
        return res.status(200).json({ result });
    } catch(err) {
        return res.status(500).json({ message: `Error, could not delete product: ${err}` });
    }
});

routes.patch('/api/products/:prodId', upload.single('image'), async (req, res) => {
    const productId = req.params.prodId;
    const { name, price, stock, description, specs } = req.body;

    const productData = {
        name,
        price,
        stock,
        description,
        specs: typeof specs === 'string'
            ? specs.split('\n').map((spec) => spec.trim()).filter(Boolean)
            : []
    };

    if (req.file) {
        productData.imageUrl = `/uploads/${req.file.filename}`;
    }

    try {
        // check if the provided picture matches the old picture or not. If not then delete the current picture from the server
        const currentProduct = await Product.findOne({ catalogId: Number.parseInt(productId, 10) });
        if (currentProduct?.imageUrl && productData.imageUrl && currentProduct.imageUrl !== productData.imageUrl) {
            await deleteFile(currentProduct.imageUrl);
        }

        const result = await Product.findOneAndUpdate(
            { catalogId: Number.parseInt(productId, 10) },
            productData,
            { returnDocument: 'after', runValidators: true } // run validators makes sure the values provided aren't invalid
        );

        if (!result) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json({ result });
    } catch(error) {
        return res.status(500).json({ message: `Error, could not update product: ${error}` });
    }
})

async function deleteFile(filePath) {
    if (!filePath?.startsWith('/uploads/')) {
        return;
    }

    try {
        const absolutePath = path.resolve(currentDirectory, '../public', filePath.slice(1));
        await fs.unlink(absolutePath);
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
    }
}

export { routes as productRoute };