import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../database';
import { verifyJWT } from '../middleware/verify-jwt';

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  app.post('/', async (request, reply) => {
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      date_time: z.string().datetime(),
      is_diet: z.boolean(),
    });

    const { name, description, date_time, is_diet } = createMealSchema.parse(
      request.body
    );

    const userId = request.user.sub;

    const [meal] = await db('meals')
      .insert({
        user_id: userId,
        name,
        description,
        date_time: new Date(date_time),
        is_diet,
      })
      .returning('*');

    return reply.status(201).send({ meal });
  });

  app.get('/', async (request, reply) => {
    const userId = request.user.sub;

    const meals = await db('meals')
      .where({ user_id: userId })
      .orderBy('date_time', 'desc');

    return reply.status(200).send({ meals });
  });

  app.get('/:id', async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getMealParamsSchema.parse(request.params);
    const userId = request.user.sub;

    const meal = await db('meals')
      .where({
        id,
        user_id: userId,
      })
      .first();

    if (!meal) {
      return reply.status(404).send({ message: 'Meal not found' });
    }

    return reply.status(200).send({ meal });
  });

  app.put('/:id', async (request, reply) => {
    const updateMealParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const updateMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date_time: z.string().datetime().optional(),
      is_diet: z.boolean().optional(),
    });

    const { id } = updateMealParamsSchema.parse(request.params);
    const userId = request.user.sub;
    const data = updateMealBodySchema.parse(request.body);

    const meal = await db('meals')
      .where({
        id,
        user_id: userId,
      })
      .first();

    if (!meal) {
      return reply.status(404).send({ message: 'Meal not found' });
    }

    const updateData: any = {
      updated_at: new Date(),
    };

    if (data.name) updateData.name = data.name;
    if (data.description) updateData.description = data.description;
    if (data.date_time) updateData.date_time = new Date(data.date_time);
    if (data.is_diet !== undefined) updateData.is_diet = data.is_diet;

    const [updatedMeal] = await db('meals')
      .where({ id })
      .update(updateData)
      .returning('*');

    return reply.status(200).send({ meal: updatedMeal });
  });

  app.delete('/:id', async (request, reply) => {
    const deleteMealParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = deleteMealParamsSchema.parse(request.params);
    const userId = request.user.sub;

    const meal = await db('meals')
      .where({
        id,
        user_id: userId,
      })
      .first();

    if (!meal) {
      return reply.status(404).send({ message: 'Meal not found' });
    }

    await db('meals').where({ id }).delete();

    return reply.status(204).send();
  });

  app.get('/metrics', async (request, reply) => {
    const userId = request.user.sub;

    const totalMeals = await db('meals')
      .where({ user_id: userId })
      .count('id as total')
      .first();

    const totalDietMeals = await db('meals')
      .where({ user_id: userId, is_diet: true })
      .count('id as total')
      .first();

    const totalNonDietMeals = await db('meals')
      .where({ user_id: userId, is_diet: false })
      .count('id as total')
      .first();

    const meals = await db('meals')
      .where({ user_id: userId })
      .orderBy('date_time', 'asc');

    let bestSequence = 0;
    let currentSequence = 0;

    for (const meal of meals) {
      if (meal.is_diet) {
        currentSequence++;
        bestSequence = Math.max(bestSequence, currentSequence);
      } else {
        currentSequence = 0;
      }
    }

    return reply.status(200).send({
      totalMeals: Number(totalMeals?.total || 0),
      totalDietMeals: Number(totalDietMeals?.total || 0),
      totalNonDietMeals: Number(totalNonDietMeals?.total || 0),
      bestSequence,
    });
  });
}

