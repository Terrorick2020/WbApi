import dotenv from 'dotenv'

dotenv.config({ path: '.env' })


export const PORT: number     = Number( process.env.PORT )     || 3000
export const HOST: string     = String( process.env.HOST )     || 'localhost'
export const POSTFIX: string  = String( process.env.POSTFIX )  || 'api'
export const NODE_ENV: string = String( process.env.NODE_ENV ) || 'development'
export const isDev: boolean   = NODE_ENV === 'development'

export const DB_HOST: string = String( process.env.DB_HOST ) || 'db'
export const DB_USER: string = String( process.env.DB_USER ) || 'user'
export const DB_PASSWORD: string = String( process.env.DB_PASSWORD ) || 'password'
export const DB_NAME: string = String( process.env.DB_NAME ) || 'wildberries_db'
export const GOOGLE_API_KEY: string = String( process.env.GOOGLE_API_KEY ) || 'your_key'
