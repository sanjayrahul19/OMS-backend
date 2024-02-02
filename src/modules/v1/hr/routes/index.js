import express from 'express';
//validators
import paramsValidator from '../validators/params-validator';
import listUser from '../controllers/user-management/list-user';
import getUser from '../../user/controllers/user-management/get-user';
import deleteUser from '../controllers/user-management/delete-user';
import unblockUser from '../controllers/user-management/unblock-user';
import blockUser from '../controllers/user-management/block-user';
import logout from '../../user/controllers/user-management/logout';
import createCategory from '../controllers/category-management/create-category';
import listCategory from '../controllers/category-management/list-category';
import categoryValidator from '../validators/category-validator';
import getCategory from '../controllers/category-management/get-category';
import deleteCategory from '../controllers/category-management/delete-category';
import updateCategory from '../controllers/category-management/update-category';
import userValidator from '../../user/validators/user-validator';
import signUpUser from '../controllers/user-management/sign-up-user';
import updateUser from '../controllers/user-management/update-user';
import signupHr from '../controllers/hr-management/signup-hr';
import loginHr from '../controllers/hr-management/login-hr';
import getHr from '../controllers/hr-management/get-hr';
import listHr from '../controllers/hr-management/list-hr';
import updateHr from '../controllers/hr-management/update-hr';
import deleteHr from '../controllers/hr-management/delete-hr';
import hrValidator from '../validators/hr-validator';
import hrAuthentication from '../authentication/hr-authentication';


const hrRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//hr management routes
hrRouter.post('/signup', [hrValidator.signup], signupHr.create);
hrRouter.post('/login', [hrValidator.login], loginHr.get);
hrRouter.get('/details/:id', [hrAuthentication.check, paramsValidator.validate], getHr.get);
hrRouter.get('/list', [hrAuthentication.check],listHr.list)
hrRouter.patch('/update/:id', [hrAuthentication.check, paramsValidator.validate, hrValidator.update], updateHr.update)
hrRouter.delete('/delete/:id', [hrAuthentication.check, paramsValidator.validate], deleteHr.delete)
hrRouter.delete('/logout', [hrAuthentication.check], logout.delete);

//category routes
hrRouter.post('/category', [hrAuthentication.check, categoryValidator.create], createCategory.create)
hrRouter.get('/categories', [hrAuthentication.check], listCategory.list)
hrRouter.get('/category/:id', [hrAuthentication.check], paramsValidator.validate, getCategory.get)
hrRouter.patch('/category/:id', [hrAuthentication.check, categoryValidator.update], categoryValidator.update, updateCategory.update)
hrRouter.delete('/category/:id', [hrAuthentication.check], paramsValidator.validate, deleteCategory.delete)

//user management
hrRouter.get('/list-users', [hrAuthentication.check], listUser.list);
hrRouter.get('/user-details/:id', [paramsValidator.validate,hrAuthentication.check], getUser.get)
hrRouter.delete('/delete-user/:id', [paramsValidator.validate,hrAuthentication.check], deleteUser.delete);
hrRouter.patch('/block-user/:id', [paramsValidator.validate,hrAuthentication.check], blockUser.update);
hrRouter.patch('/unblock-user/:id', [paramsValidator.validate,hrAuthentication.check], unblockUser.update);
hrRouter.post('/user-signup',[userValidator.signup,hrAuthentication.check],signUpUser.create)
hrRouter.patch('/user-update/:id',[paramsValidator.validate,hrAuthentication.check,userValidator.hrUserUpdate],updateUser.update)


module.exports = hrRouter;