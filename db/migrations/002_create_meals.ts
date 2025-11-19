import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const isSQLite = knex.client.config.client === 'sqlite' || knex.client.config.client === 'sqlite3';

  await knex.schema.createTable('meals', (table) => {
    if (isSQLite) {
      table.text('id').primary();
      table.text('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    } else {
      table.uuid('id').primary();
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    }
    table.text('name').notNullable();
    table.text('description').notNullable();
    table.integer('date').notNullable();
    table.boolean('is_on_diet').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}

