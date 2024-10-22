import { Context, Next } from 'hono';
import { verifyToken } from '../utils/jwtService';
import { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken: JwtPayload | null = verifyToken(token);

    if (!decodedToken) {
        return c.json({ error: 'Invalid or expired token' }, 401);
    }

    c.set('validatedUser', decodedToken);

    await next();
};
