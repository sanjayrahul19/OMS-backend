import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Express from './express';


// Basic configuration 
export default class BaseConfig extends Express {

    constructor() {
        super()
        //set mongoose
        this.mongoose = mongoose;
        //set environment variables
        this.ENV = dotenv.config().parsed;
    }
}

