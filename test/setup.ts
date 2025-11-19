import { beforeAll, afterAll, beforeEach } from 'vitest';
import { app } from '../src/app';
import { knex } from '../src/database';

// Configuração compartilhada para todos os testes
beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
  await knex.destroy();
});

// Limpa as tabelas antes de cada teste para garantir isolamento
beforeEach(async () => {
  await knex('meals').del();
  await knex('users').del();
});

