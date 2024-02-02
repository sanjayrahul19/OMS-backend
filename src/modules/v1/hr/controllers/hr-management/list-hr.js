import { responseHandler } from "../../../../../utils/response-handler";
import { Hr } from "../../models/hr-model";
import { redis } from "../../../../../config/index";

class ListHrController {
  

    /**
     * @description   API to get hr details
     * @param {*} req /api/v1/hr/get-hr/:id
     * @param {*} res
     */
    async list(req, res) {
        try {
            const cachedAdminList = await redis.getCache('hrList');

            if (cachedAdminList) {
                return responseHandler.successResponse(res, cachedAdminList, "Hr list retrieved successfully from cache", 200);
            }

            const result = await Hr.find();

            if (result.length !== 0) {
                
                await redis.setCache('adminList', result);

                return responseHandler.successResponse(res, result, "Hr list retrieved successfully from MongoDB", 200);
            } else {
                return responseHandler.errorResponse(res, [], "No hrs found", 200);
            }
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new ListHrController();
