import { fetchAndStoreTariffs } from './service'
import knex from './db/database'
import cron from 'node-cron'

/**
 * Основная функция, выполняющая первоначальное обновление тарифов
 * и настраивающая крон-задачу для их периодического обновления.
 * 
 * Этапы выполнения функции:
 * 	1. выполняет обновление тарифов, вызывая `fetchAndStoreTariffs(knex)`.
 * 	2. запускает крон-задачу, которая обновляет тарифы каждый час.
 * 	3. в случае ошибки выводит сообщение в консоль.
 * 	4. в конце освобождает ресурсы, закрывая соединение с базой данных.
 * 
 * @async
 * @function main
 * @returns {Promise<void>}
 */
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
