import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

Joi.objectId = require('joi-objectid')(Joi);

class UserValidator {
    constructor() {
        this.schemas = {
            signup: Joi.object({
                username: Joi.string().required().error(new Error("Username is required")),
                email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(new Error("Valid email is required")),
                password: Joi.string().required().error(new Error("Password is required")),
                team: Joi.string().error(new Error("Team is required")).required(),
                role: Joi.string().valid('PM', 'TL', 'EMPLOYEE').error(new Error("Valid role is required")).required(),
                profile_picture: Joi.string().allow('').error(new Error("Upload a proper profile pic")),
            }),

            emailVerify: Joi.object({
                otp: Joi.number().required().error(new Error("Otp is required")),
            }),

            resetPassword: Joi.object({
                otp: Joi.number().required().error(new Error("Otp is required")),
                password: Joi.string().required().error(new Error("Password is required"))
            }),

            changePassword: Joi.object({
                old_password: Joi.string().required().error(new Error("Old password is required")),
                new_password: Joi.string().required().error(new Error("New Password is required"))
            }),


            login: Joi.object({
                email: Joi.string().required().error(new Error("Email is required")),
                password: Joi.string().required().error(new Error("Password is required")),
            }),

            update: Joi.object({
                username: Joi.string().error(new Error("Enter a valid first name")),
                profile_picture: Joi.string().allow('').error(new Error("Upload a proper profile pic")),
            }),
            hrUserUpdate: Joi.object({
                username: Joi.string().error(new Error("Enter a valid first name")),
                profile_picture: Joi.string().allow('').error(new Error("Upload a proper profile pic")),
                team: Joi.string().error(new Error("Team is required")),
                role: Joi.string().valid('PM', 'TL', 'EMPLOYEE').error(new Error("Valid role is required")),
            }),
        };
    }

    validateAndNext = (schemaName) => (req, res, next) => {
        const schema = this.schemas[schemaName];
        try {
            const { error } = schema.validate(req.body);
            if (!error) {
                next();
            } else {
                const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return responseHandler.errorResponse(res, {}, errorMessage, 400);
            }
        } catch (err) {
            console.error(err);
            responseHandler.errorResponse(res, err);
        }
    };

    signup = this.validateAndNext('signup');
    login = this.validateAndNext('login');
    update = this.validateAndNext('update');
    hrUserUpdate=this.validateAndNext('hrUserUpdate');
    emailVerify = this.validateAndNext('emailVerify');
    resetPassword = this.validateAndNext('resetPassword');
    changePassword = this.validateAndNext('changePassword');
}

export default new UserValidator();