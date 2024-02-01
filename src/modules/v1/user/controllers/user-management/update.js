import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";


class UpdateUserController {



    /**
      * @description   api to update user 
      * @param {*} req /api/v1/user/update
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const user = JSON.parse(decrypt(req.headers.authorization.split(' ')[1]));
            const result = await User.findByIdAndUpdate(user.id, req.body, { new: true })
            if (result) {
                return responseHandler.successResponse(res, result, "User details updated successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "User details not found", 400);
            }
        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new UpdateUserController();

