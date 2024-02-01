import { Schema, model } from 'mongoose';

/**
 * AdminSchema
 * @description Admin model
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
    is_primary: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'password must not be empty'],
    },
    phone_number: {
        type: Number,
        unique: true
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


export const Admin = model('admin', AdminSchema);