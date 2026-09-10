import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { Product } from './models/product.js';
import { Counter } from './models/counter.js';

config();

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.resolve(
    currentDirectory,
    '../frontend_root/frontend/public/api/products.json'
);

const seedProducts = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTIONURL);

    const productsFile = await readFile(productsPath, 'utf8');
    const products = JSON.parse(productsFile);
    const documents = products.map(({ id, ...product }) => ({
        ...product,
        catalogId: id
    }));
    // get the last id and set it to counter's sequenceValue
    const lastId = documents.at(-1).catalogId;
    await Counter.findOneAndUpdate(
        { _id: "products" },
        { $set: { sequenceValue: lastId } },
        { upsert: true, returnDocument: 'after' }
    );
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