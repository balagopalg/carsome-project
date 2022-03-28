import { isEmpty } from 'lodash'
import { NextFunction } from 'express'
import { customDb } from '../utils/mysql-controller'
import { express } from '../../index'

export { productDetails }
/**
 * List all products with average ratings
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}  {Promise<any>}
 */
const productDetails = async (req: express.Request, res: express.Response, next: NextFunction): Promise<any> => {
  try {
    const query = `
      SELECT Distinct id, name, 
      (SELECT ROUND(AVG(rating), 2) FROM Ratings ra WHERE ra.product_id = p.id) AS averageRatings
      FROM Products p
      LEFT JOIN Ratings r ON p.id = r.product_id
      WHERE active = 1 ORDER BY (SELECT ROUND(AVG(rating), 2) FROM Ratings ra WHERE ra.product_id = p.id) DESC 
    `
    const result = await customDb(null, query)
    if (isEmpty(result)) {
      res.send({ status: false, message: 'No products found' })
      return
    }
    const response: ProductResponse = { status: true, message: 'successful', result }
    res.send(response)
    return
  } catch (err) {
    next(err)
  }
}
