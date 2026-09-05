import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { Product } from './models/product.js';

config();

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.resolve(
    currentDirectory,
    '../frontend_root/frontend/public/api/products.json'
);

const seedProducts = async () => {
    const productsFile = await readFile(productsPath, 'utf8');
    const products = JSON.parse(productsFile);
    const documents = products.map(({ id, ...product }) => ({
        ...product,
        catalogId: id
    }));

    await mongoose.connect(process.env.MONGODB_CONNECTIONURL);
    await Product.deleteMany({});
    await Product.insertMany(documents);

    console.log(`Seeded ${documents.length} products.`);
};

try {
    await seedProducts();
} catch (error) {
    console.error('Product seeding failed:', error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}