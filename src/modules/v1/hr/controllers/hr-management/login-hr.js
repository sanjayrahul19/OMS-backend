import { responseHandler } from '../../../../../utils/response-handler';
import { createSession, decrypt } from '../../../../../utils/encrypt';
import { Hr } from '../../models/hr-model';

class LoginController {

    /**
     * @description   api to hr login
     * @param {*} req /api/v1/hr/login
     * @param {*} res 
     */

    async get(req, res) {
        try {
            const admin = await Hr.findOne({ email: req.body.email });
            if (!admin) {
                return responseHandler.errorResponse(res, {}, 'No hr exists with this username', 400);
            }

            if (decrypt(admin.password) !== req.body.password) {
                return responseHandler.errorResponse(res, {}, 'Password is incorrect, please try again', 400);
            }

            const session = await createSession(admin);
            return responseHandler.successResponse(res, { admin, session }, 'Hr logged in successfully', 200);
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new LoginController();
