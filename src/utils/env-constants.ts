import * as dotenv from 'dotenv'

dotenv.config()

export const mySQLPassword = process.env.mySQLPassword ? process.env.mySQLPassword : 'insert_password'
export const mySQLDatabase = process.env.mySQLDatabase ? process.env.mySQLDatabase : 'carsome'
export const mySQLUser = process.env.mySQLUser ? process.env.mySQLUser : 'root'
export const mySQLHost = process.env.mySQLHost ? process.env.mySQLHost : 'localhost'
export const PORT = process.env.PORT ? process.env.PORT : '3306'
