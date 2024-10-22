import 'reflect-metadata';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { athleteRoutes } from './interfaces/http/routes/athleteRoutes';
import redisClient from './infrastructure/cache/RedisClient';
import dotenv from 'dotenv';
dotenv.config();

const app = new Hono();

app.use('*', logger());
app.get('/', (c) => c.text('Local server running from Hono 👩‍🚀👩‍🚀'));
app.route('/athletes', athleteRoutes);

const port = process.env.PORT || 3000;

redisClient.connect().then(() => {
  console.log('Connected to Redis successfully!');
  serve({
    fetch: app.fetch,
    port: Number(port),
  });

  console.log(`🚀 Server is running on port ${port}`);
}).catch((err) => {
  console.error('Failed to connect to Redis:', err);
  process.exit(1);
});
