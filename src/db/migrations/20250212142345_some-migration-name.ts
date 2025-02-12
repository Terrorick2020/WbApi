import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('warehouse_tariffs', table => {
		table.increments('id').primary()
		table.string('warehouse_name').notNullable()
		table.decimal('box_delivery_and_storage_expr')
		table.decimal('box_delivery_base')
		table.decimal('box_delivery_liter')
		table.decimal('box_storage_base')
		table.decimal('box_storage_liter')
		table.date('dt_next_box')
		table.date('dt_till_max')
		table.date('date').notNullable()
		table.unique(['warehouse_name', 'date'])
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('warehouse_tariffs')
}
