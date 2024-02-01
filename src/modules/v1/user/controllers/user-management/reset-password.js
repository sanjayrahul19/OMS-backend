import { encrypt } from "../../../../../utils/encrypt";
import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";



class ResetUserPasswordController {


    /**
      * @description   api to reset user password
      * @param {*} req /api/v1/user/reset-password
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const result = await User.findOneAndUpdate(
                { email: req.query.email, otp: req.body.otp },
                { password: encrypt(req.body.password), $unset: { otp: 1 } },
                { new: true }
            ).exec();

            if (result) {
                await mailContent.passwordResetSuccess(result);
                return responseHandler.successResponse(res, result, "User password has been changed successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'Password reset otp is invalid or has expired.', 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ResetUserPasswordController();

