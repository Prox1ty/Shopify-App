import { validateToken } from "../services/authentication.js";

export const checkForAuthCookie = (cookieName) => {
    return (req, res, next) => {
        const cookieToken = req.cookies[cookieName];
        if (!cookieToken) {
            // if a token does not exist just forward the request (it won't be processed)
            return next();
        }

        try {
            const userPayload = validateToken(cookieToken);
            req.user = userPayload; // will be useful for getting user name, user orders etc.
        } catch (error) {
        }

        return next();
    }
}