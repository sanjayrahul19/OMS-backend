import { redis } from "../../../../config";
import { responseHandler } from "../../../../utils/response-handler";
import { ApiLog } from "../../hr/models/api-log-model";

class ListApiLogsController {
    /**
     * @description   API to get admin details
     * @param {*} req /api/v1/logs/list-api-logs
     * @param {*} res
     */
    async list(req, res) {
        try {
            let result;

            try {
                const cachedApiLogsList = await redis.getCache('apiLogsList');

                if (cachedApiLogsList) {
                    return responseHandler.successResponse(res, cachedApiLogsList, "Api logs list retrieved successfully from cache", 200);
                }
            } catch (err) {
                console.error('Error fetching from cache:', err);
            }

            try {
                result = await ApiLog.find();
            } catch (err) {
                console.error('Error fetching from MongoDB:', err);
                return responseHandler.errorResponse(res, err);
            }

            if (result.length !== 0) {
                try {
                    await redis.setCache('apiLogsList', result);
                } catch (err) {
                    console.error('Error setting cache:', err);
                }

                return responseHandler.successResponse(res, result, "Admin list retrieved successfully from MongoDB", 200);
            } else {
                return responseHandler.errorResponse(res, [], "No admins found", 200);
            }
        } catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }
    }
}

export default new ListApiLogsController();
