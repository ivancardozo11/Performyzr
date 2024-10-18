import 'reflect-metadata';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { athleteRoutes } from './interfaces/http/routes/athleteRoutes';
import { metricRoutes } from './interfaces/http/routes/metricRoutes';

const app = new Hono();

app.get('/', (c) => c.text('Local server running from Hono 👩‍🚀👩‍🚀'));
app.route('/athletes', athleteRoutes);
app.route('/metrics', metricRoutes); 

const port = 3000;
console.log(`🚀 Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
