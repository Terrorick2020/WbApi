import { fetchAndStoreTariffs } from './service'
import knex from './db/database'
import cron from 'node-cron'

async function main() {
	try {
		await fetchAndStoreTariffs(knex)
		console.log('Тарифы успешно обновлены!')

		cron.schedule('0 * * * *', async () => {
			try {
				await fetchAndStoreTariffs(knex)
				console.log('Тарифы успешно обновлены!')
			} catch (error) {
				console.error('Ошибка при обновлении тарифов:', error)
			}
		})

	} catch (error) {
		console.error('Ошибка при обновлении тарифов:', error)
	} finally {
		await knex.destroy()
	}
}

main()
