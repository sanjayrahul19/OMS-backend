import { decrypt, encrypt } from "../../../../../utils/encrypt";
import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";



class ChangeUserPasswordController {


    /**
      * @description   api to change user password
      * @param {*} req /api/v1/user/change-password
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const user = await User.findById(req.params.id)

            if (decrypt(user.password) !== req.body.old_password) {
                return responseHandler.errorResponse(res, {}, 'Wrong old password.', 400);
            }

            const result = await User.findByIdAndUpdate(
                req.params.id,
                { password: encrypt(req.body.new_password) },
                { new: true }
            ).exec();

            if (result) {
                await mailContent.passwordResetSuccess(result);
                return responseHandler.successResponse(res, result, "User password has been changed successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'Changing password.', 400);
            }
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ChangeUserPasswordController();

