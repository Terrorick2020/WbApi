import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

import wbRouter from './app/wb/wb.routes'

import { errorHandler } from './app/middleware/error.middleware'


import {
    PORT,
    HOST,
    POSTFIX,
    isDev
} from './config/config.main'


const start = async () => {
    const app = express()

    app.use( express.json() )
    app.use( helmet() )

    if( isDev ) {
        app.use( morgan( 'dev' ) )
    }

    app.use( `/${POSTFIX}/wb`, wbRouter )

    app.use( errorHandler )


    app.listen( PORT, HOST, () => {
        console.log( `\n🚀 Сервер запущен по адресу: http://${ HOST }:${ PORT }/${POSTFIX}\n` )
    })
}

start()