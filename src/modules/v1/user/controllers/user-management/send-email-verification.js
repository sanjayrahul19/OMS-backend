import { otpGenerator } from "../../../../../utils/encrypt";
import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";


class SendVerificationLink {



    /**
     * @description   API for Password Reset Token Link send through Email 
     * @param {*} req /api/v1/user/send-verification-mail?email=email@mailinator.com
     * @param {*} res 
     */

    async update(req, res) {

        try {
            const user = await User.findOne({ email: req.query.email }).exec()
            if (!user) return responseHandler.errorResponse(res, {}, "Email not found", 400);
            if (user.email_verified == true) return responseHandler.errorResponse(res, {}, "User email is already verified", 400);
            const updates = await setOtp(user.email);
            // send email 
            await mailContent.verificationMail(updates);
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

export default new SendVerificationLink();


export const setOtp = async (email) => {
    try {
        // Generate and set otp
        const otp = otpGenerator()
        const updates = await User.findOneAndUpdate(
            { email: email },
            { otp },
            { new: true }
        );
        return updates;
    } catch (err) {
        console.error(err)
        throw err;
    }
};


