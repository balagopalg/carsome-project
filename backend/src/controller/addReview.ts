import { isEmpty } from 'lodash'
import { NextFunction } from 'express'
import { customDb } from '../utils/mysql-controller'
import { decimalCount, validateFreeText, _generateTimestamp } from '../utils/utils'
import { express } from '../../index'

export { addReview }
/**
 * Function to add new review
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}  {Promise<any>}
 */
const addReview = async (req: express.Request, res: express.Response, next: NextFunction): Promise<any> => {
  // Input
  const { productId, rating } = req.body
  let { review } = req.body

  // Validations
  if (isNaN(productId)) res.send({ status: false, message: 'Invalid Product Id' })
  if (!decimalCount(rating, 2) || rating > 5 || rating <= 0) res.send({ status: false, message: 'Invalid Rating' })
  if (isNaN(rating)) res.send({ status: false, message: 'Invalid Rating' })
  if (!isEmpty(review)) if (!validateFreeText(review, 50)) res.send({ status: false, message: 'Review exceed the text limit' })

  if (isEmpty(review)) review = null

  const time = _generateTimestamp()

  const insertQuery = 'INSERT into Ratings '
  let condition = `(product_id, rating, review, timestamp) VALUES (${productId}, ${rating}, '${review}', ${time})`
  if (isEmpty(review)) condition = `(product_id, rating, timestamp) VALUES (${productId}, ${rating}, ${time})`

  try {
    // query to check if product exist
    let query = `
            SELECT name 
            FROM Products p
            WHERE p.active = 1 AND p.id = ${productId}
        `
    let result = await customDb(null, query)
    if (isEmpty(result)) {
      res.send({ status: false, message: 'Invalid Product Id' })
      return
    }

    // query to add the review
    query = ` ${insertQuery} ${condition} `
    result = await customDb(null, query)

    res.send({ status: true, message: 'successful' })
    return
  } catch (err) {
    next(err)
  }
}
