import { Schema, model } from 'mongoose';

/**
 * CategorySchema
 * @description Category model
 */

const CategorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    image: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });


export const Category = model('category', CategorySchema);