import { model, Schema } from 'mongoose';

const productSchema = Schema({
	catalogId: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	imageUrl: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	specs: {
		type: [String],
		default: []
	},
	stock: {
		type: Number,
		required: true,
		min: 0
	}
}, { timestamps: true });

export const Product = model('product', productSchema);
