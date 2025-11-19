import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { usersRoutes } from './routes/users.routes';
import { mealsRoutes } from './routes/meals.routes';

export const app = fastify();

app.setErrorHandler((error, request, reply) => {
  console.error(error);
  return reply.status(500).send({ error: 'Internal Server Error' });
});

app.register(cookie);

app.register(usersRoutes, { prefix: '/users' });
app.register(mealsRoutes, { prefix: '/meals' });

