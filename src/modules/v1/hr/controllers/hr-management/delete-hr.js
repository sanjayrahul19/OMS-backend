import { responseHandler } from "../../../../../utils/response-handler";
import { Hr } from "../../models/hr-model";



class DeleteHrController {

  

    /**
      * @description   api to hr signup
      * @param {*} req /api/v1/hr/signup
      * @param {*} res 
      */

    async delete(req, res) {

        try {
            const result = await Hr.findByIdAndDelete(req.params.id)
            if(result){
                return responseHandler.successResponse(res, result, "Hr details deleted successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Hr details not found", 400);
            }
        }
        catch (err) {
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new DeleteHrController();

