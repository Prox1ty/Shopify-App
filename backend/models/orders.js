import mongoose, { Schema, model } from 'mongoose';

const orderItemSchema = Schema({
    productId: {
        type: Number,
        ref: 'product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1]
    },
    image: {
        type: String
    }
}, { _id: false }); // mongoose won't auto assign ids now

const orderSchema = Schema({
    products: [orderItemSchema], // array of subdocuments
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    totalQuantity: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

export const Order = model('order', orderSchema);