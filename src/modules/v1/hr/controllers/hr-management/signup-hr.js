import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import { Hr } from "../../models/hr-model";


class SignupController {

    /**
      * @description   api to hr signup
      * @param {*} req /api/v1/hr/signup
      * @param {*} res 
      */
   
    async create(req, res) {
        try {
            req.body.password = encrypt(req.body.password)
            const hr = await Hr.create(req.body)
            if (hr) {
                const session = await createSession(hr)
                return responseHandler.successResponse(res, { hr, session }, "hr signup successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "hr creation failed", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SignupController();

