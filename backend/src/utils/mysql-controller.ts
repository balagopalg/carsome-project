import { MysqlError } from 'mysql'
import { connection } from './mysql-handler'

export { customDb }

/**
 * Function to query mySQL database
 *
 * @param {*} args
 * @param {(string | null)} [query]
 * @param {string} [iFuncName]
 * @param {string} [desc]
 * @return {*}  {Promise<any>}
 */
const customDb = async (args, query?: string | null, iFuncName?: string, desc?: string): Promise<any> => {
  let funcName = 'customDb'
  if (iFuncName) funcName = `${iFuncName}/${funcName}`
  let QUERY = 'SELECT ? FROM ?? WHERE ?? = ?'
  if (query != null) QUERY = query
  return await new Promise((resolve, reject) => {
    return connection.query(QUERY, args, (err: MysqlError, data: any) => {
      if (err) {
        let errKey = err.message
        if (QUERY.includes('INSERT')) errKey = 'Insert Failed'
        else if (QUERY.includes('UPDATE')) errKey = 'Update Failed'
        reject({ errKey, errObj: err, funcName, desc })
      }
      resolve(data)
    })
  })
}
