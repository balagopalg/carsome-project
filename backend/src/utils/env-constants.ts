import * as dotenv from 'dotenv'

dotenv.config()

export const mySQLPassword = process.env.mySQLPassword ? process.env.mySQLPassword : 'carsome-new'
export const mySQLDatabase = process.env.mySQLDatabase ? process.env.mySQLDatabase : 'carsome'
export const mySQLUser = process.env.mySQLUser ? process.env.mySQLUser : 'admin'
export const mySQLHost = process.env.mySQLHost ? process.env.mySQLHost : 'carsome-new.cjqzcldwdmgi.ap-southeast-1.rds.amazonaws.com'
export const MYSQLPORT = process.env.PORT ? process.env.PORT : '3306'
export const PORT = process.env.PORT ? process.env.PORT : '5000'
