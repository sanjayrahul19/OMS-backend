import { encrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../../user/models/user-model";



class SignupController {

    /**
      * @description   api to user signup
      * @param {*} req /api/v1/hr/user-signup
      * @param {*} res 
      */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const user = await User.create(req.body)
            if (user) {
                return responseHandler.successResponse(res, {}, "user signup successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'user signup failed', 400);
            }
        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new SignupController();

