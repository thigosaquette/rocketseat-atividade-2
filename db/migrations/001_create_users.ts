import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const isSQLite = knex.client.config.client === 'sqlite' || knex.client.config.client === 'sqlite3';

  await knex.schema.createTable('users', (table) => {
    if (isSQLite) {
      table.text('id').primary();
      table.text('session_id').notNullable();
    } else {
      table.uuid('id').primary();
      table.uuid('session_id').notNullable();
    }
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}

