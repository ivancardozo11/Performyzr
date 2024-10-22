import jwt, { JwtPayload } from 'jsonwebtoken';

if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}


const secretKey = process.env.JWT_SECRET_KEY; 

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, secretKey);
        if (typeof decoded === 'string') {
            return null;
        }
        return decoded as JwtPayload;
    } catch (err) {
        return null;
    }
};
