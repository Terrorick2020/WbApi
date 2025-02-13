import { fetchAndStoreTariffs } from './service'
import { createGoogleSheets, exportDataToSheets } from './googleSheetsService'
import knex from './db/database'
import cron from 'node-cron'

async function main() {
	try {
		// Очистка таблицы Google Sheets в БД
		await knex('google_sheets').del()
		console.log('Таблица google_sheets очищена.')

		// Создание новых Google-таблиц
		const sheetIds = await createGoogleSheets(3)
		await knex('google_sheets').insert(
			sheetIds.map(id => ({ spreadsheet_id: id }))
		)
		console.log('Google-таблицы успешно созданы и сохранены в БД')

		// Запрос данных из API и сохранение в БД
		await fetchAndStoreTariffs(knex)
		console.log('Тарифы успешно обновлены в БД!')

		// Выгрузка данных из БД в Google-таблицы
		await exportDataToSheets()
		console.log('Данные успешно выгружены в Google-таблицы!')
		console.log('Следующее обновление данных через 1 час')

		// Запуск обновления данных каждый 1 час
		cron.schedule('0 * * * *', async () => {
			try {
				await fetchAndStoreTariffs(knex)
				console.log('Тарифы успешно обновлены в БД!')

				await exportDataToSheets()
				console.log('Данные успешно выгружены в Google-таблицы!')
				console.log('Следующее обновление данных через 1 час')
			} catch (error) {
				console.error('Ошибка при обновлении тарифов и выгрузке данных:', error)
			}
		})
	} catch (error) {
		console.error('Ошибка в процессе выполнения:', error)
	} finally {
		await knex.destroy()
	}
}

main()
