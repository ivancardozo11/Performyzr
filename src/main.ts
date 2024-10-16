import 'reflect-metadata';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { athleteRoutes } from './interfaces/http/routes/athleteRoutes';



const app = new Hono();
app.get('/', (c) => c.text('Local server running from Hono 👩‍🚀👩‍🚀'));

app.route('/athletes', athleteRoutes);

const port = 3000;
console.log(`🚀 Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
