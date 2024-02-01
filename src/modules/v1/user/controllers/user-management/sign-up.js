import { responseHandler } from "../../../../../utils/response-handler";
import { encrypt } from "../../../../../utils/encrypt";
import { User } from "../../models/user-model";
import { setOtp } from "./send-email-verification";
import mailContent from "../../../../../utils/mail-content";


class SignupController {



    /**
      * @description   api to user signup
      * @param {*} req /api/v1/user/signup
      * @param {*} res 
      */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const user = await User.create(req.body)
            if (user) {
                const updates = await setOtp(user.email)
                await mailContent.verificationMail(updates)
                return responseHandler.successResponse(res, { email: user.email }, "user signup successfull", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'signup failed', 400);
            }

        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SignupController();

