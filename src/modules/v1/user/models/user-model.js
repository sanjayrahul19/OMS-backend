import { Schema, model } from 'mongoose';

/**
 * UserSchema
 * @description User model
 */

const UserSchema = new Schema({

    username: {
        type: String,
        required: [true, 'username must not be empty'],
    },
    profile_picture:{
        type: String,
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
    otp: {
        type: Number
    },
    role: {
        type: String,
        enum: ['PM', 'TL', 'EMPLOYEE'],
        required: [true, 'role must not be empty']
    },
    team: {
        type: String,
        required: [true, 'team must not be empty']
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


export const User = model('user', UserSchema);