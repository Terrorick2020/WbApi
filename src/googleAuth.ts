import { google } from 'googleapis'
import { readFileSync } from 'fs'

const credentials = JSON.parse(readFileSync('./src/service_cred.json', 'utf8'))

const auth = new google.auth.JWT(
	credentials.client_email,
	undefined,
	credentials.private_key,
	[
		'https://www.googleapis.com/auth/spreadsheets',
		'https://www.googleapis.com/auth/drive', 
		'https://www.googleapis.com/auth/drive.file', 
		'https://www.googleapis.com/auth/drive.resource', 
	]
)

export { auth }
