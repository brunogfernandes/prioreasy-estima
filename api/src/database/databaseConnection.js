import knex from 'knex';

import {knex_connection} from '../database/mysql.js';

const connectionDatabase = knex(knex_connection);

export default connectionDatabase;