import * as mysql from 'mysql'

import {  mySQLDatabase, mySQLHost, mySQLPassword, mySQLUser, PORT } from '../utils/env-constants'

export const connection = mysql.createConnection({
  host: mySQLHost,
  user: mySQLUser,
  password: mySQLPassword,
  database: mySQLDatabase,
  port: parseInt(PORT),
})
