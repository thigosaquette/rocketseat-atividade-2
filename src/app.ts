import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { usersRoutes } from './routes/users';
import { mealsRoutes } from './routes/meals';

export const app = fastify();

app.addHook('onRequest', async (request: any, reply: any) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (request.method === 'OPTIONS') {
    return reply.send();
  }
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'daily-diet-secret-key',
});

app.register(usersRoutes, { prefix: '/users' });
app.register(mealsRoutes, { prefix: '/meals' });

app.get('/health', async () => {
  return { status: 'ok' };
});

