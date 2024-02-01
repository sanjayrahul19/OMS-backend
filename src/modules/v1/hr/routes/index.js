import express from 'express';
//validators
import paramsValidator from '../validators/params-validator';
import signupAdmin from '../controllers/admin-management/signup-admin';
import loginAdmin from '../controllers/admin-management/login-admin';
import getAdmin from '../controllers/admin-management/get-admin';
import listAdmin from '../controllers/admin-management/list-admin';
import updateAdmin from '../controllers/admin-management/update-admin';
import adminValidator from '../validators/admin-validator';
import deleteAdmin from '../controllers/admin-management/delete-admin';
import listUser from '../controllers/user-management/list-user';
import getUser from '../../user/controllers/user-management/get-user';
import deleteUser from '../controllers/user-management/delete-user';
import unblockUser from '../controllers/user-management/unblock-user';
import blockUser from '../controllers/user-management/block-user';
import logout from '../../user/controllers/user-management/logout';
import adminAuthentication from '../authentication/admin-authentication';
import createCategory from '../controllers/category-management/create-category';
import listCategory from '../controllers/category-management/list-category';
import categoryValidator from '../validators/category-validator';
import getCategory from '../controllers/category-management/get-category';
import deleteCategory from '../controllers/category-management/delete-category';
import updateCategory from '../controllers/category-management/update-category';
import userValidator from '../../user/validators/user-validator';
import signUpUser from '../controllers/user-management/sign-up-user';
import updateUser from '../controllers/user-management/update-user';


const hrRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//admin management routes
hrRouter.post('/signup', [adminValidator.signup], signupAdmin.create);
hrRouter.post('/login', [adminValidator.login], loginAdmin.get);
hrRouter.get('/details/:id', [adminAuthentication.check, paramsValidator.validate], getAdmin.get);
hrRouter.get('/list', [adminAuthentication.check], listAdmin.list)
hrRouter.patch('/update/:id', [adminAuthentication.check, paramsValidator.validate, adminValidator.update], updateAdmin.update)
hrRouter.delete('/delete/:id', [adminAuthentication.check, paramsValidator.validate], deleteAdmin.delete)
hrRouter.delete('/logout', [adminAuthentication.check], logout.delete);

//category routes
hrRouter.post('/category', [adminAuthentication.check, categoryValidator.create], createCategory.create)
hrRouter.get('/categories', [adminAuthentication.check], listCategory.list)
hrRouter.get('/category/:id', [adminAuthentication.check], paramsValidator.validate, getCategory.get)
hrRouter.patch('/category/:id', [adminAuthentication.check, categoryValidator.update], categoryValidator.update, updateCategory.update)
hrRouter.delete('/category/:id', [adminAuthentication.check], paramsValidator.validate, deleteCategory.delete)

//user management
hrRouter.get('/list-users', [adminAuthentication.check], listUser.list);
hrRouter.get('/user-details/:id', [paramsValidator.validate,adminAuthentication.check], getUser.get)
hrRouter.delete('/delete-user/:id', [paramsValidator.validate,adminAuthentication.check], deleteUser.delete);
hrRouter.patch('/block-user/:id', [paramsValidator.validate,adminAuthentication.check], blockUser.update);
hrRouter.patch('/unblock-user/:id', [paramsValidator.validate,adminAuthentication.check], unblockUser.update);
hrRouter.post('/user-signup',[userValidator.signup,adminAuthentication.check],signUpUser.create)
hrRouter.patch('/user-update/:id',[paramsValidator.validate,adminAuthentication.check,userValidator.hrUserUpdate],updateUser.update)


module.exports = hrRouter;