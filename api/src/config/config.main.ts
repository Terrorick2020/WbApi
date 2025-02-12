import dotenv from 'dotenv'

dotenv.config({ path: '.env' })


export const PORT: number     = Number( process.env.PORT )     || 3000
export const HOST: string     = String( process.env.HOST )     || 'localhost'
export const POSTFIX: string  = String( process.env.POSTFIX )  || 'api'
export const NODE_ENV: string = String( process.env.NODE_ENV ) || 'development'
export const isDev: boolean   = NODE_ENV === 'development'