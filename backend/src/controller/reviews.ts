import { isEmpty } from 'lodash'
import { NextFunction } from 'express'
import { express } from '../..'
import { customDb } from '../utils/mysql-controller'

export { productReviews }
/**
 * Returns all reviews of a particular product
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}  {Promise<any>}
 */
const productReviews = async (req: express.Request, res: express.Response, next: NextFunction): Promise<any> => {
  const { productId } = req.body

  if (isNaN(productId)) res.send({ status: false, message: 'Invalid Product Id' })

  try {
    const query = `
      SELECT 
        rating, review, id, name,
        (SELECT ROUND(AVG(rating), 2) FROM Ratings ra WHERE ra.product_id = ${productId}) AS averageRatings 
      FROM Ratings r
      INNER JOIN Products p ON r.product_id = p.id
      WHERE p.active = 1 AND r.product_id = ${productId} ORDER BY timestamp DESC
    `
    const result = await customDb(null, query)
    if (isEmpty(result)) {
      res.send({ status: false, message: 'No reviews available' })
      return
    }
    const response: ProductResponse = { status: true, message: 'successful', result }
    res.send(response)
    return
  } catch (err) {
    next(err)
  }
}
