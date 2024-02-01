import express from 'express';
import getUser from '../controllers/user-management/get-user';
import verifyEmail from '../controllers/user-management/verify-email';
import paramsValidator from '../../hr/validators/params-validator';
import userValidator from '../validators/user-validator';
import resetPassword from '../controllers/user-management/reset-password';
import logout from '../controllers/user-management/logout';
import userAuthentication from '../authentication/user-authentication';
import sendEmailVerification from '../controllers/user-management/send-email-verification';
import update from '../controllers/user-management/update';
import sendForgotPassword from '../controllers/user-management/send-forgot-password';
import login from '../controllers/user-management/login';


const userRouter = express.Router();

/**
 * user routes
 * @description user routes
 */

//user routes
userRouter.post('/login', [userValidator.login], login.get);
userRouter.get('/send-verification-mail', sendEmailVerification.update);
userRouter.get('/send-forgot-password-mail', sendForgotPassword.update);
userRouter.patch('/verify-email/:id', [paramsValidator.validate], verifyEmail.update);
userRouter.patch('/update/:id', [paramsValidator.validate, userValidator.update],update.update);
userRouter.get('/details', [userAuthentication.check, paramsValidator.validate], getUser.get);
userRouter.patch('/reset-password/:id', [paramsValidator.validate], resetPassword.update);
userRouter.delete('/logout', logout.delete);

module.exports = userRouter;