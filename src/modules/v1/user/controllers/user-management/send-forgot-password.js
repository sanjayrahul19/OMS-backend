import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";
import { setOtp } from "./send-email-verification";


class SendForgotPasswordLink {

  

    /**
     * @description   API for Password Reset Token Link send through Email 
     * @param {*} req /api/v1/user/send-forgot-password?email=mail@mailinator.com
     * @param {*} res 
     */

    async update(req, res) {

        try {

            const user = await User.findOne({ email: req.query.email }).exec()
            if (!user) return responseHandler.errorResponse(res, {}, "Email not found", 400);
            const updates = await setOtp(user.email);
            // send email 
            await mailContent.forgetPassword(updates);
            if (updates) {
                return responseHandler.successResponse(res, {}, "Verification sent successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Failed to send verification mail", 400);
            }
        }

        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SendForgotPasswordLink();


