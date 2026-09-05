import JWT from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const generateUserToken = (user) => {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    const secret = process.env.JWTSECRET;

    const token = JWT.sign(payload, secret);
    return token;
}

export const validateToken = (token) => {
    const secret = process.env.JWTSECRET;
    const payload = JWT.verify(token, secret);
    return payload;
}
