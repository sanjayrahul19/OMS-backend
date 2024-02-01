import { createSession } from '../../../../../utils/encrypt';
import { responseHandler } from '../../../../../utils/response-handler';
import { User } from '../../models/user-model';

class VerifyEmail {

    /**
     * @description   api to verify user email 
     * @param {*} req /api/v1/user/verify-email?email=mail@mailinator.com
     * @param {*} res 
     */

    async update(req, res) {
        try {
            const { email } = req.query;
            const { otp } = req.body;

            const updates = { $unset: { otp: 1 }, email_verified: true };

            const user = await User.findOneAndUpdate(
                { email, otp },
                updates,
                { new: true, select: '-otp -password' }
            ).exec();

            if (user) {
                const session = await createSession(user);
                return responseHandler.successResponse(res, { user, session }, "User email verified", 200);
            }
            return responseHandler.errorResponse(res, {}, 'Invalid user', 400);
        } catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new VerifyEmail();
