import { responseHandler } from "../../../../../utils/response-handler";
import { Hr } from "../../models/hr-model";


class GetHrController {

  

    /**
      * @description   api to get hr details
      * @param {*} req /api/v1/hr/get-hr/:id
      * @param {*} res 
      */

    async get(req, res) {

        try {
            const result = await Hr.findById(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "Hr details retrieved successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Hr details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new GetHrController();

