import type { Knex } from 'knex'
import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_USER,
} from './src/config/config.main'
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: {
			host: DB_HOST,
			user: DB_USER,
			password: DB_PASSWORD,
			database: DB_NAME,
		},
		migrations: {
			directory: './migrations',
			extension: 'ts',
		},
	},
}

export default config
