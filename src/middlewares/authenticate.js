import createHttpError from "http-errors";
import { SessionCollection } from "../db/models/session.js";
import { UserCollection } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        next(createHttpError(401, 'Please provide Authorization header'));
        return;
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }

    const session = await SessionCollection.findOne({ accessToken: token });

   if (!session) {
        return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
        return next(createHttpError(401, 'Access token expired'));
    }

    const user = await UserCollection.findById(session.userId);
    console.log('User:', user);

    if (!user) {
        return next(createHttpError(401));
    }

    req.user = user;

    next();
};