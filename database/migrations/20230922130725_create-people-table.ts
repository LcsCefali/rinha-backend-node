import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('people', (table) => {
    table.uuid('id').primary().unique().index()
    table.string('apelido').index()
    table.string('nome')
    table.json('stack')
    table.string('nascimento')
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('people');
}

