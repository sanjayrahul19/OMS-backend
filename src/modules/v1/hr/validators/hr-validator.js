import Joi from 'joi';
import { responseHandler } from '../../../../utils/response-handler';

class HrValidator {
    constructor() {
        this.schemas = {
            signup: Joi.object({
                name: Joi.string().required().error(new Error("Name is required")),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error("Valid email is required")),
                password: Joi.string().required().error(new Error("Please enter a valid password")),
            }),

            login: Joi.object({
                email: Joi.string().required().error(new Error("Email is required")),
                password: Joi.string().required().error(new Error("Please enter a valid password")),
            }),

            update: Joi.object({
                name: Joi.string().error(new Error("Enter a valid name")),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(new Error("Enter a valid email")),
            }),
        };
    }

    validateAndNext = (schemaName) => {
        return (req, res, next) => {
            const schema = this.schemas[schemaName];
            const { error } = schema.validate(req.body);
            if (!error) {
                next();
            } else {
                const errorMessage = error.message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                return responseHandler.errorResponse(res, {}, errorMessage, 400);
            }
        };
    };

    signup = this.validateAndNext('signup');
    login = this.validateAndNext('login');
    update = this.validateAndNext('update');
}

export default new HrValidator();
