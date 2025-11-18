import fastify from 'fastify';
import { config } from 'dotenv';
import fastifyJwt from '@fastify/jwt';
import { usersRoutes } from './routes/users';
import { mealsRoutes } from './routes/meals';

config();

const app = fastify();

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

app.register(usersRoutes);
app.register(mealsRoutes);

app.get('/health', async () => {
  return { status: 'ok' };
});

const port = Number(process.env.PORT) || 3333;

app
  .listen({
    port,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  })
  .catch((err: any) => {
    console.error(err);
    process.exit(1);
  });

