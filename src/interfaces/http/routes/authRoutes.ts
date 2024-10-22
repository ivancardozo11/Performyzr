import { Hono } from 'hono';
import { generateToken } from '../../../utils/jwtService';

const authRoutes = new Hono();

authRoutes.post('/login', async (c) => {
    const { username, password } = await c.req.json();
    
    if (username === 'admin' && password === 'password') {
        const token = generateToken({ username });
        return c.json({ token });
    } else {
        return c.json({ error: 'Invalid credentials' }, 401);
    }
});

export { authRoutes };
