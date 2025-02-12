import knex from 'knex'
import config from '../../knexfile'


/**
 * Создаёт и экспортирует экземпляр Knex для работы с базой данных.
 * 
 * - Использует конфигурацию из `knexfile.ts` (раздел `development`).
 * - Позволяет выполнять SQL-запросы через Knex в проекте.
 * 
 * @constant {Knex} db - Экземпляр Knex, настроенный для среды разработки.
 */
const db = knex(config.development)

export default db
