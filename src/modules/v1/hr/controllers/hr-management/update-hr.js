import { responseHandler } from "../../../../../utils/response-handler";
import { Hr } from "../../models/hr-model";


class UpdateHrController {

  

    /**
      * @description   api to update hr 
      * @param {*} req /api/v1/hr/update
      * @param {*} res 
      */

    async update(req, res) {

        try {
            const result = await Hr.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (result) {
                return responseHandler.successResponse(res, result, "Hr details updated successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Hr details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new UpdateHrController();

