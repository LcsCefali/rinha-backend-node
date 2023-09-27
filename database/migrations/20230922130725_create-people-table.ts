import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('people', (table) => {
    table.uuid('id').primary().index()
    table.string('apelido', 32).unique().notNullable().index()
    table.string('nome', 100).notNullable()
    table.string('stack')
    table.date('nascimento').notNullable()
    table.string('all', 1000).index()

    table.index(['id', 'apelido', 'all'], 'index-geral')
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('people');
}

