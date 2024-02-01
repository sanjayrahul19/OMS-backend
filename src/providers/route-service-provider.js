import BaseConfig from "../config/base-config";
import userRouter from "../modules/v1/user/routes";
import hrRouter from "../modules/v1/hr/routes";
import fileRouter from "../modules/v1/file-upload/routes/fileupload-routes"
import logsRouter from "../modules/v1/log/routes/index"
import basicAuth from 'express-basic-auth';
import { responseHandler } from "../utils/response-handler";
import path from 'path';
import { config } from "../config";

export default class RouteServiceProvider extends BaseConfig {

    constructor() {
        super();
        this.loadRoutes();
        this.routeNotFound();
    }

    /**
     * 
     * @param {*} route functions 
     */
    loadRoutes() {
        this.app.get('/', (req, res) => { res.send('Application api working') });
        this.app.use('/logs', logsRouter);
        this.app.use('/api/v1/user', userRouter);
        this.app.use('/api/v1/hr', hrRouter);
        this.app.use('/api/v1/file-upload', fileRouter);
        this.app.use('/logs-page', basicAuth({
            users: { [config.ENV.LOG_USERNAME]: config.ENV.LOG_PASSWORD },
            challenge: true
        }));
        // Serve logs.html from the 'public' directory
        this.app.get('/logs-page', (req, res) => {
            const publicPath = path.join(__dirname, '../../public');
            res.sendFile(path.join(publicPath, 'logs.html'));
        });
    }


    routeNotFound() {
        this.app.use((req, res, next) => {
            return responseHandler.errorResponse(res, {}, 'Requested route not found', 404);
        });
    }
}