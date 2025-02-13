import { google } from 'googleapis'
import { auth } from './googleAuth'
import knex from './db/database'

const sheets = google.sheets({ version: 'v4', auth })
const drive = google.drive({ version: 'v3', auth })

export async function createGoogleSheets(count: number): Promise<string[]> {
	const spreadsheetIds: string[] = []

	for (let i = 0; i < count; i++) {
		const response = await sheets.spreadsheets.create({
			requestBody: {
				properties: { title: `Wildberries Tariffs Data ${i + 1}` },
				sheets: [{ properties: { title: 'stocks_coefs' } }],
			},
		})

		const spreadsheetId = response.data.spreadsheetId
		if (spreadsheetId) {
			const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
			console.log(`Создана таблица ${i + 1}: ${sheetUrl}`)
			spreadsheetIds.push(spreadsheetId)

			await drive.permissions.create({
				fileId: spreadsheetId,
				requestBody: {
					role: 'reader', // Чтение
					type: 'anyone', // Доступ всем, у кого есть ссылка
				},
			})
		} else {
			console.error(`Ошибка: spreadsheetId не получен для таблицы ${i + 1}`)
		}
	}

	return spreadsheetIds
}

async function fetchGoogleSheetIds(): Promise<string[]> {
	const sheetRecords = await knex('google_sheets').select('spreadsheet_id')
	return sheetRecords.map(record => record.spreadsheet_id)
}

async function fetchDataFromDB() {
	return knex('warehouse_tariffs')
		.select('*')
		.orderBy('box_delivery_and_storage_expr', 'asc')
}

export async function exportDataToSheets() {
	try {
		const spreadsheetIds = await fetchGoogleSheetIds()
		if (spreadsheetIds.length === 0) {
			console.log('В БД нет Google-таблиц для обновления.')
			return
		}

		const data = await fetchDataFromDB()
		if (data.length === 0) {
			console.log('В БД нет данных для выгрузки.')
			return
		}

		const headers = Object.keys(data[0])
		const values = data.map(row => headers.map(header => row[header]))
		const sheetData = [headers, ...values]

		for (const spreadsheetId of spreadsheetIds) {
			await sheets.spreadsheets.values.update({
				spreadsheetId,
				range: 'stocks_coefs!A1',
				valueInputOption: 'RAW',
				requestBody: { values: sheetData },
			})

			console.log(
				`✅ Данные обновлены: https://docs.google.com/spreadsheets/d/${spreadsheetId}`
			)
		}
	} catch (error) {
		console.error('❌ Ошибка при выгрузке данных:', error)
	}
}
