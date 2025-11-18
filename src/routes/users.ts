import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../database';
import { hashPassword, comparePassword } from '../utils/hash';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserSchema.parse(request.body);

    const userExists = await db('users').where({ email }).first();

    if (userExists) {
      return reply.status(409).send({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await db('users')
      .insert({
        name,
        email,
        password: hashedPassword,
      })
      .returning('*');

    return reply.status(201).send({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    });
  });

  app.post('/sessions', async (request, reply) => {
    const createSessionSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = createSessionSchema.parse(request.body);

    const user = await db('users').where({ email }).first();

    if (!user) {
      return reply.status(401).send({ message: 'Invalid credentials' });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return reply.status(401).send({ message: 'Invalid credentials' });
    }

    const token = app.jwt.sign(
      {
        sub: user.id,
      },
      {
        expiresIn: '7d',
      }
    );

    return reply.status(200).send({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
}

