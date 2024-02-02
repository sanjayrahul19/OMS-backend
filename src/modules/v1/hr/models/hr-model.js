import { Schema, model } from 'mongoose';

/**
 * AdminSchema
 * @description Hr model
 */

const AdminSchema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    email: {
        type: String,
        required: [true, 'email must not be empty'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
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


export const Hr = model('hr', AdminSchema);