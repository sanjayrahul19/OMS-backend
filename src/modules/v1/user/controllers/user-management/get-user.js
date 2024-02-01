import { decrypt } from "../../../../../utils/encrypt";
import { responseHandler } from "../../../../../utils/response-handler";
import { User } from "../../models/user-model";


class GetUserController {



    /**
      * @description   api to get user details
      * @param {*} req /api/v1/user/get-user/:id
      * @param {*} res 
      */

    async get(req, res) {

        try {

            const user = JSON.parse(decrypt(req.headers.authorization.split(' ')[1]));

            const result = await User.findById(user.id)
            if (result) {
                return responseHandler.successResponse(res, result, "User details retrieved successfully", 200);
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

export default new GetUserController();

