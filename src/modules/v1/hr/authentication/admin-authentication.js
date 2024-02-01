import passport from 'passport';
import { Strategy } from 'passport-strategy';
import { Session } from '../models/session-model';
import { responseHandler } from '../../../../utils/response-handler';
import { User } from '../../user/models/user-model';

class CustomAdminAuthStrategy extends Strategy {
    constructor() {
        super();
    }

    async authenticate(req, options) {
        const token = req.headers.authorization;

        if (!token) {
            return this.fail('Missing authentication token', 401);
        }

        const sessionToken = token.split(' ')[1];

        try {
            const result = await Session.findOne({ session_token: sessionToken, status: 1 });

            if (!result) {
                return this.fail('Invalid session token', 401);
            }

            const admin = await User.findOne({ _id: result.user_id, role: "HR" });
          
            if (!admin) {
                return this.fail('Access denied', 401);
            }

            this.success(admin);

        } catch (error) {
            return this.error('Internal server error', error);
        }
    }
}

// Create an instance of the custom strategy and use it with Passport
const customAdminAuthStrategy = new CustomAdminAuthStrategy();

class AdminAuthentication {
    constructor() {
        // Use the custom strategy instead of JWT
        passport.use('admin-custom', customAdminAuthStrategy);
    }

    async check(req, res, next) {
        passport.authenticate('admin-custom', { session: false }, (err, user) => {
            if (err) {
                return responseHandler.errorResponse(res, err);
            }
            if (!user) {
                return responseHandler.errorResponse(res, {}, 'Authentication failed', 401);
            }

            req.user = user;
            next();
        })(req, res, next);
    }
}

export default new AdminAuthentication();
