import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('google_sheets', table => {
		table.increments('id').primary()
		table.string('spreadsheet_id').notNullable().unique()
		table.timestamp('created_at').defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('google_sheets')
}
